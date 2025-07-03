import { defineCollection, z } from 'astro:content'

import { POSTS_CONFIG } from '~/config'
import type { PostLayout, ImageRatio } from '~/types'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    // 文章标题（必需）
    title: z.string(),
    // 文章描述（可选）
    description: z.string(),
    // 发布日期（必需）
    pubDate: z.date(),
    // 更新日期（可选）
    updatedDate: z.date().optional(),
    // 是否推荐，默认为 false
    recommend: z.boolean().default(false),
    // 作者，默认使用全局配置
    author: z.string().default(POSTS_CONFIG.author),
    // 封面图（可选）
    image: z
      .string()
      .transform((val) => {
        if (!val) return undefined
        return val.startsWith('http') ? val : `/hero-images/${val}`
      })
      .optional(),
    // Open Graph 图片（可选）
    ogImage: z
      .string()
      .transform((val) => {
        if (!val) return undefined
        return val.startsWith('http') ? val : `/og-images/${val}`
      })
      .optional(),
    // 布局类型（可选，默认根据是否有图片自动选择）
    layout: z.custom<PostLayout>().optional(),
    // 图片宽高比，默认使用全局配置
    imageRatio: z.custom<ImageRatio>().default(POSTS_CONFIG.defaultImageRatio),
    // 标签列表
    tags: z.array(z.string()),
  }),
})

// 导出内容集合配置
export const collections = { posts }
