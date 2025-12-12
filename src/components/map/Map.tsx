import * as turf from '@turf/turf'
import React, { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useStore } from '@nanostores/react'
import { currentStopId, currentZoom, currentCenter, scrollProgress } from '~/stores/mapStore'
import { themeStore } from '~/stores/theme'

// ==================== 常量定义 ====================
const MAP_CONFIG = {
  center: [120.1385, 30.2499] as [number, number], // 西湖中心
  zoom: 13,
  styles: {
    dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  },
}

const ROUTE_DATA = {
  type: 'FeatureCollection',
  features: [
    // 旅行路线
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [120.1485, 30.2599], // 断桥
          [120.1425, 30.2579], // 白堤
          [120.1385, 30.2499], // 苏堤
          [120.1355, 30.2459], // 三潭印月
          [120.1485, 30.2399], // 雷峰塔
          [120.1445, 30.2359], // 花港观鱼
          [120.1285, 30.2499], // 曲院风荷
          [120.0985, 30.2499], // 灵隐寺
          [120.0885, 30.2299], // 龙井村
          [120.0785, 30.2199], // 梅家坞
        ],
      },
    },
    // 第一站：断桥
    {
      type: 'Feature',
      properties: { slug: 'start-point', name: '断桥' },
      geometry: {
        type: 'Point',
        coordinates: [120.1485, 30.2599],
      },
    },
    // 第二站：白堤
    {
      type: 'Feature',
      properties: { slug: 'second-point', name: '白堤' },
      geometry: {
        type: 'Point',
        coordinates: [120.1425, 30.2579],
      },
    },
    // 第三站：苏堤
    {
      type: 'Feature',
      properties: { slug: 'third-point', name: '苏堤春晓' },
      geometry: {
        type: 'Point',
        coordinates: [120.1385, 30.2499],
      },
    },
    // 第四站：三潭印月
    {
      type: 'Feature',
      properties: { slug: 'fourth-point', name: '三潭印月' },
      geometry: {
        type: 'Point',
        coordinates: [120.1355, 30.2459],
      },
    },
    // 第五站：雷峰塔
    {
      type: 'Feature',
      properties: { slug: 'fifth-point', name: '雷峰塔' },
      geometry: {
        type: 'Point',
        coordinates: [120.1485, 30.2399],
      },
    },
    // 第六站：花港观鱼
    {
      type: 'Feature',
      properties: { slug: 'sixth-point', name: '花港观鱼' },
      geometry: {
        type: 'Point',
        coordinates: [120.1445, 30.2359],
      },
    },
    // 第七站：曲院风荷
    {
      type: 'Feature',
      properties: { slug: 'seventh-point', name: '曲院风荷' },
      geometry: {
        type: 'Point',
        coordinates: [120.1285, 30.2499],
      },
    },
    // 第八站：灵隐寺
    {
      type: 'Feature',
      properties: { slug: 'eighth-point', name: '灵隐寺' },
      geometry: {
        type: 'Point',
        coordinates: [120.0985, 30.2499],
      },
    },
    // 第九站：龙井村
    {
      type: 'Feature',
      properties: { slug: 'ninth-point', name: '龙井村' },
      geometry: {
        type: 'Point',
        coordinates: [120.0885, 30.2299],
      },
    },
    // 第十站：梅家坞
    {
      type: 'Feature',
      properties: { slug: 'tenth-point', name: '梅家坞' },
      geometry: {
        type: 'Point',
        coordinates: [120.0785, 30.2199],
      },
    },
  ],
}

// ==================== 图层样式类型定义 ====================
type DashedStyle = { color: string; width: number; dasharray: [number, number] }
type SolidStyle = { color: string; width: number }
type PointsStyle = { color: string; radius: number }
type TextStyle = { color: string; halo: string }

const LAYER_STYLES = {
  dashed: {
    dark: { color: '#999999', width: 3, dasharray: [2, 4] as [number, number] },
    light: { color: '#CCCCCC', width: 3, dasharray: [2, 4] as [number, number] },
  },
  solid: {
    dark: { color: '#999999', width: 3 },
    light: { color: '#CCCCCC', width: 3 },
  },
  points: {
    dark: { color: '#FFFFFF', radius: 5 },
    light: { color: '#000000', radius: 5 },
  },
  pointsUnvisited: {
    dark: { color: '#FFB3BA', radius: 5 }, // 淡红色
    light: { color: '#FF9999', radius: 5 }, // 淡红色
  },
  text: {
    dark: { color: '#FFFFFF', halo: '#000000' },
    light: { color: '#000000', halo: '#FFFFFF' },
  },
} as const

// ==================== 工具函数 ====================
const getMapStyle = (isDark: boolean) => (isDark ? MAP_CONFIG.styles.dark : MAP_CONFIG.styles.light)

const getDashedStyle = (isDark: boolean): DashedStyle => LAYER_STYLES.dashed[isDark ? 'dark' : 'light']
const getSolidStyle = (isDark: boolean): SolidStyle => LAYER_STYLES.solid[isDark ? 'dark' : 'light']
const getPointsStyle = (isDark: boolean): PointsStyle => LAYER_STYLES.points[isDark ? 'dark' : 'light']
const getTextStyle = (isDark: boolean): TextStyle => LAYER_STYLES.text[isDark ? 'dark' : 'light']

// ==================== 主组件 ====================
export default function Map() {
  // ========== State & Refs ==========
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const fullGeoJSON = useRef<any>(null)
  const hasSwitchedTheme = useRef(false)
  const isFirstThemeCheck = useRef(true)

  // ========== Store ==========
  const $currentStopId = useStore(currentStopId)
  const $currentZoom = useStore(currentZoom)
  const $currentCenter = useStore(currentCenter)
  const $scrollProgress = useStore(scrollProgress)
  const $theme = useStore(themeStore)

  // ========== 计算主题 ==========
  const isDark = $theme === 'dark' || ($theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  // ==================== 图层管理函数 ====================
  const addMapLayers = (mapInstance: maplibregl.Map, theme: boolean, showDetails: boolean) => {
    const dashedStyle = getDashedStyle(theme)
    const solidStyle = getSolidStyle(theme)
    const pointsStyle = getPointsStyle(theme)
    const pointsUnvisitedStyle = LAYER_STYLES.pointsUnvisited[theme ? 'dark' : 'light']
    const textStyle = getTextStyle(theme)

    const visibility = showDetails ? 'visible' : 'none'

    // 1. 添加背景虚线图层（浅灰色）
    mapInstance.addLayer({
      id: 'route-line-dashed',
      type: 'line',
      source: 'route-source',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        'visibility': visibility,
      },
      paint: {
        'line-color': dashedStyle.color,
        'line-width': dashedStyle.width,
        'line-dasharray': dashedStyle.dasharray,
      },
      filter: ['==', '$type', 'LineString'],
    })

    // 2. 添加动态实线图层（浅灰色）
    mapInstance.addLayer({
      id: 'route-line-solid',
      type: 'line',
      source: 'active-route-source',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': solidStyle.color,
        'line-width': solidStyle.width,
      },
    })

    // 3. 添加所有圆点图层（淡红色）- 先添加，显示所有点
    mapInstance.addLayer({
      id: 'route-points-unvisited',
      type: 'circle',
      source: 'route-source',
      layout: {
        visibility: 'visible',
      },
      paint: {
        'circle-radius': ['case', ['==', ['get', 'visited'], true], pointsStyle.radius, pointsUnvisitedStyle.radius],
        'circle-color': ['case', ['==', ['get', 'visited'], true], pointsStyle.color, pointsUnvisitedStyle.color],
        // 添加过渡动画 - 平滑的颜色和大小变化
        'circle-radius-transition': {
          duration: 600,
          delay: 0,
        },
        'circle-color-transition': {
          duration: 600,
          delay: 0,
        },
      },
      filter: ['==', '$type', 'Point'],
    })

    // 5. 添加文字标签图层 (自定义地名)
    mapInstance.addLayer({
      id: 'route-labels',
      type: 'symbol',
      source: 'route-source',
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 1.2],
        'text-anchor': 'top',
        'text-size': 12,
        'visibility': visibility,
      },
      paint: {
        'text-color': textStyle.color,
        'text-halo-color': textStyle.halo,
        'text-halo-width': 1,
      },
      filter: ['==', '$type', 'Point'],
    })
  }

  // ==================== 隐藏底图标签和细节，只保留线条 ====================
  const hideBaseLayers = (mapInstance: maplibregl.Map) => {
    const style = mapInstance.getStyle()
    if (!style || !style.layers) return

    // 我们的自定义图层ID列表
    const ourLayers = ['route-line-dashed', 'route-line-solid', 'route-points-unvisited', 'route-labels']

    // 隐藏所有标签和符号图层（保留线条）
    style.layers.forEach((layer) => {
      // 隐藏所有 symbol 类型的图层（标签），但保留我们自己的标签
      if (layer.type === 'symbol' && !ourLayers.includes(layer.id)) {
        mapInstance.setLayoutProperty(layer.id, 'visibility', 'none')
      }
      // 隐藏填充图层（建筑、水域等），只保留线条
      if (layer.type === 'fill' && !ourLayers.includes(layer.id)) {
        mapInstance.setLayoutProperty(layer.id, 'visibility', 'none')
      }
      // 隐藏圆点图层（POI等），但保留我们的点
      if (layer.type === 'circle' && !ourLayers.includes(layer.id)) {
        mapInstance.setLayoutProperty(layer.id, 'visibility', 'none')
      }
      // 保留 line 类型的图层（道路、边界等线条）
      // 保留 background 图层
    })
  }

  // ==================== Effect: 初始化地图 ====================
  useEffect(() => {
    if (map.current) return

    if (!mapContainer.current) return

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: getMapStyle(isDark),
      center: MAP_CONFIG.center,
      zoom: MAP_CONFIG.zoom, // 初始 Zoom
      attributionControl: false,
      interactive: false,
    })

    map.current.on('load', () => {
      if (!map.current) return

      setIsLoaded(true)
      // 初始化时给所有点添加 visited: false 属性
      const initialData = {
        ...ROUTE_DATA,
        features: ROUTE_DATA.features.map((feature: any) => {
          if (feature.geometry.type === 'Point') {
            return {
              ...feature,
              properties: {
                ...feature.properties,
                visited: false,
              },
            }
          }
          return feature
        }),
      }
      fullGeoJSON.current = initialData

      // 隐藏底图标签和细节，只保留线条
      hideBaseLayers(map.current)

      map.current.addSource('route-source', {
        type: 'geojson',
        data: initialData as any,
      })

      map.current.addSource('active-route-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      })

      addMapLayers(map.current, isDark, hasSwitchedTheme.current)

      // 确保初始 zoom 正确 (虽然初始化已经设置，但防止 store 变更)
      if ($currentZoom !== MAP_CONFIG.zoom) {
        map.current.setZoom($currentZoom)
      }

      // 初始化时触发一次点状态更新
      const routeSource = map.current.getSource('route-source') as maplibregl.GeoJSONSource
      if (routeSource) {
        routeSource.setData(initialData as any)
      }

      // 确保过渡属性正确设置
      if (map.current.getLayer('route-points-unvisited')) {
        map.current.setPaintProperty('route-points-unvisited', 'circle-radius-transition', {
          duration: 600,
          delay: 0,
        })
        map.current.setPaintProperty('route-points-unvisited', 'circle-color-transition', {
          duration: 600,
          delay: 0,
        })
      }
    })
  }, [])

  // ==================== Effect: Zoom 和 Center 变化 ====================
  useEffect(() => {
    if (!isLoaded || !map.current) return

    // 构建飞行参数
    const flyToOptions: maplibregl.FlyToOptions = {
      zoom: $currentZoom,
      speed: 1.2,
      curve: 1.42,
    }

    // 如果有新的中心点，也更新中心点
    if ($currentCenter) {
      flyToOptions.center = $currentCenter
    }

    // 平滑飞行到新的缩放级别和中心点
    map.current.flyTo(flyToOptions)
  }, [$currentZoom, $currentCenter, isLoaded])

  // ==================== Effect: 主题切换 ====================
  useEffect(() => {
    if (isFirstThemeCheck.current) {
      isFirstThemeCheck.current = false
      return
    }

    hasSwitchedTheme.current = true

    if (!map.current || !isLoaded) return

    map.current.setStyle(getMapStyle(isDark), { diff: false })

    map.current.once('styledata', () => {
      if (!fullGeoJSON.current || !map.current) return

      // 再次隐藏底图标签和细节，只保留线条
      hideBaseLayers(map.current)

      if (!map.current.getSource('route-source')) {
        map.current.addSource('route-source', {
          type: 'geojson',
          data: fullGeoJSON.current as any,
        })

        map.current.addSource('active-route-source', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [],
          },
        })

        addMapLayers(map.current, isDark, hasSwitchedTheme.current)

        // 确保过渡属性正确设置
        if (map.current.getLayer('route-points-unvisited')) {
          map.current.setPaintProperty('route-points-unvisited', 'circle-radius-transition', {
            duration: 600,
            delay: 0,
          })
          map.current.setPaintProperty('route-points-unvisited', 'circle-color-transition', {
            duration: 600,
            delay: 0,
          })
        }
      }
    })
  }, [isDark, isLoaded])

  // ==================== Effect: 滚动监听 ====================
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1)
      scrollProgress.set(progress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初始触发

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ==================== Effect: 更新路径进度 ====================
  useEffect(() => {
    if (!isLoaded || !map.current || !fullGeoJSON.current) return

    const routeLine = fullGeoJSON.current.features.find((f: any) => f.geometry.type === 'LineString')

    if (!routeLine) return

    const totalLength = turf.length(routeLine)
    const currentLength = totalLength * $scrollProgress

    const source = map.current.getSource('active-route-source') as maplibregl.GeoJSONSource
    if (!source) return

    if (currentLength > 0) {
      const slicedRoute = turf.lineSliceAlong(routeLine, 0, currentLength)
      source.setData({
        type: 'FeatureCollection',
        features: [slicedRoute],
      })
    } else {
      source.setData({
        type: 'FeatureCollection',
        features: [],
      })
    }

    // 更新点的访问状态
    const routeSource = map.current.getSource('route-source') as maplibregl.GeoJSONSource
    if (!routeSource) return

    // 计算每个点在路线上的累计距离
    const routeCoords = routeLine.geometry.coordinates
    const pointDistances: number[] = []

    // 为每个路线坐标点计算累计距离
    let cumulativeDistance = 0
    for (let i = 0; i < routeCoords.length; i++) {
      if (i > 0) {
        const segment = turf.lineString([routeCoords[i - 1], routeCoords[i]])
        cumulativeDistance += turf.length(segment)
      }
      pointDistances.push(cumulativeDistance)
    }

    const updatedFeatures = fullGeoJSON.current.features.map((feature: any) => {
      if (feature.geometry.type === 'Point') {
        // 找到该点在路线坐标数组中的索引
        const pointCoords = feature.geometry.coordinates
        let pointIndex = -1
        let minDistance = Infinity

        for (let i = 0; i < routeCoords.length; i++) {
          const dist = turf.distance(turf.point(pointCoords), turf.point(routeCoords[i]))
          if (dist < minDistance) {
            minDistance = dist
            pointIndex = i
          }
        }

        // 计算到该点的累计距离
        const pointDistance = pointIndex >= 0 ? pointDistances[pointIndex] : 0

        // 判断是否已路过（允许一些容差）
        const visited = pointDistance <= currentLength + 0.0001 // 小容差避免精度问题

        return {
          ...feature,
          properties: {
            ...feature.properties,
            visited,
          },
        }
      }
      return feature
    })

    routeSource.setData({
      type: 'FeatureCollection',
      features: updatedFeatures,
    })
  }, [$scrollProgress, isLoaded])

  // ==================== Effect: 当前站点高亮（可选） ====================
  useEffect(() => {
    if (!isLoaded || !map.current || !fullGeoJSON.current || !$currentStopId) return
    // 可以在这里做其他交互
  }, [$currentStopId, isLoaded])

  // ==================== 渲染 ====================
  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  )
}
