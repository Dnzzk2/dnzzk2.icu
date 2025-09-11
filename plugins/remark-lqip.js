import { visit } from 'unist-util-visit'
import path from 'node:path'
import { existsSync } from 'node:fs'
import sharp from 'sharp'
import { getPixels } from 'ndarray-pixels'
import quantize from '@lokesh.dhakar/quantize'
import { packColor11bit, packColor10bit } from '../src/lib/color.js'

/**
 * 基于纯CSS的LQIP实现
 * 参考: https://frzi.medium.com/lqip-css-73dc6dda2529
 * 将3个颜色打包到单个RGBA hex值中，在CSS中解包生成网格渐变
 */

/**
 * 创建像素数组用于颜色量化
 */
function createPixelArray(pixels, pixelCount, quality) {
  const pixelArray = []

  for (let i = 0, offset, r, g, b; i < pixelCount; i += quality) {
    offset = i * 4
    r = pixels[offset]
    g = pixels[offset + 1]
    b = pixels[offset + 2]

    // 跳过完全透明的像素
    if (pixels[offset + 3] > 128) {
      pixelArray.push([r, g, b])
    }
  }

  return pixelArray
}

/**
 * 加载图像数据
 */
async function loadImg(img) {
  return new Promise((resolve, reject) => {
    sharp(img)
      .toBuffer()
      .then((buffer) =>
        sharp(buffer)
          .metadata()
          .then((metadata) => ({ buffer, format: metadata.format }))
      )
      .then(({ buffer, format }) => getPixels(buffer, format))
      .then(resolve)
      .catch(reject)
  })
}

/**
 * 从图像中提取主要颜色
 */
async function extractColors(imagePath) {
  const imgData = await loadImg(imagePath)
  const pixelCount = imgData.shape[0] * imgData.shape[1]
  const pixelArray = createPixelArray(imgData.data, pixelCount, 10)

  if (pixelArray.length === 0) {
    return null
  }

  // 使用量化算法提取3个主要颜色
  const cmap = quantize(pixelArray, 3)
  const palette = cmap ? cmap.palette() : null

  if (!palette || palette.length < 3) {
    return null
  }

  return palette.slice(0, 3).map(([r, g, b]) => ({ r, g, b }))
}

/**
 * 将3个颜色打包到单个RGBA hex值中
 * 使用color.ts中的位打包方法：
 * - 第1个颜色：使用packColor11bit (R:4位, G:4位, B:3位)
 * - 第2个颜色：使用packColor11bit (R:4位, G:4位, B:3位)
 * - 第3个颜色：使用packColor10bit (R:3位, G:4位, B:3位)
 * 总共32位 = RGBA
 */
function packColorsToHex(colors) {
  const [c0, c1, c2] = colors

  // 使用color.ts中的位打包函数
  const pc0 = packColor11bit(c0) // 11位
  const pc1 = packColor11bit(c1) // 11位
  const pc2 = packColor10bit(c2) // 10位

  // 打包到32位：11 + 11 + 10 = 32位
  const combined = (BigInt(pc0) << 21n) | (BigInt(pc1) << 10n) | BigInt(pc2)

  // 转换为8位hex字符串
  const hex = '#' + combined.toString(16).padStart(8, '0')
  return hex
}

/**
 * 分析图像并生成LQIP hex值
 */
async function analyzeImageForLQIP(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata()
    const { width, height } = metadata

    // 检查图像是否不透明
    const stats = await sharp(imagePath).stats()
    if (!stats.isOpaque) {
      return null // 跳过透明图像
    }

    // 提取3个主要颜色
    const colors = await extractColors(imagePath)
    if (!colors) {
      return null
    }

    // 打包颜色为hex值
    const lqipHex = packColorsToHex(colors)

    return {
      width,
      height,
      lqipHex,
      colors, // 用于调试
    }
  } catch (error) {
    console.warn(`LQIP分析失败: ${imagePath}`, error.message)
    return null
  }
}

/**
 * 解析图像路径
 */
function resolveImagePath(imageUrl, filePath) {
  if (path.isAbsolute(imageUrl)) {
    return imageUrl
  }

  // 处理 Astro 的 ~ 路径别名
  if (imageUrl.startsWith('~/')) {
    const contentDir = path.dirname(filePath)
    const srcDir = path.dirname(path.dirname(contentDir))
    return path.resolve(srcDir, imageUrl.slice(2))
  }

  const fileDir = path.dirname(filePath || '')
  return path.resolve(fileDir, imageUrl)
}

/**
 * 处理单个图像节点
 */
async function processImageNode(node, filePath) {
  const imagePath = resolveImagePath(node.url, filePath)

  if (!existsSync(imagePath)) {
    return
  }

  const lqipData = await analyzeImageForLQIP(imagePath)
  if (!lqipData) {
    return
  }

  // 添加data属性用于CSS处理
  node.data = node.data || {}
  node.data.hProperties = node.data.hProperties || {}

  // 设置尺寸属性
  if (lqipData.width && lqipData.height) {
    node.data.hProperties.width = lqipData.width
    node.data.hProperties.height = lqipData.height
  }

  // 设置LQIP样式变量
  const style = node.data.hProperties.style || ''
  const lqipStyle = `--lqip:${lqipData.lqipHex}`

  node.data.hProperties.style = style ? `${style};${lqipStyle}` : lqipStyle
}

/**
 * Remark插件主函数
 */
function remarkLQIP() {
  return async (tree, file) => {
    const imagesToProcess = []

    // 收集所有图像节点
    visit(tree, 'image', (node) => {
      if (node.url && !node.url.match('^([a-z]+:)?//')) {
        imagesToProcess.push(node)
      }
    })

    // 并行处理所有图像
    await Promise.all(
      imagesToProcess.map(async (node) => {
        try {
          await processImageNode(node, file.path)
        } catch (error) {
          console.warn(`LQIP处理失败: ${node.url}`, error.message)
        }
      })
    )
  }
}

export default remarkLQIP
