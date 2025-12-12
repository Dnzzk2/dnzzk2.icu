import * as turf from '@turf/turf'
import React, { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useStore } from '@nanostores/react'
import { currentStopId } from '~/stores/mapStore'
import { themeStore } from '~/stores/theme'

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const fullGeoJSON = useRef<any>(null)
  const $currentStopId = useStore(currentStopId)
  const $theme = useStore(themeStore)

  // 根据 themeStore 计算实际的暗色模式状态
  const isDark = $theme === 'dark' || ($theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  // 初始化地图
  useEffect(() => {
    if (map.current) return // 防止 React 严格模式下初始化两次

    if (mapContainer.current) {
      // 根据主题选择样式
      const mapStyle = isDark
        ? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json' // 暗色样式
        : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json' // 亮色样式

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [120.1385, 30.2499], // 西湖中心
        zoom: 13, // 适合显示整个西湖区域
      })

      map.current.on('load', () => {
        setIsLoaded(true)
        console.log('地图加载完毕！')

        const initialData = {
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
                  [120.1385, 30.2499], // 苏堤
                  [120.1485, 30.2399], // 雷峰塔
                  [120.0985, 30.2499], // 灵隐寺
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
            // 第二站：苏堤
            {
              type: 'Feature',
              properties: { slug: 'second-point', name: '苏堤春晓' },
              geometry: {
                type: 'Point',
                coordinates: [120.1385, 30.2499],
              },
            },
            // 第三站：雷峰塔
            {
              type: 'Feature',
              properties: { slug: 'third-point', name: '雷峰塔' },
              geometry: {
                type: 'Point',
                coordinates: [120.1485, 30.2399],
              },
            },
            // 第四站：灵隐寺
            {
              type: 'Feature',
              properties: { slug: 'fourth-point', name: '灵隐寺' },
              geometry: {
                type: 'Point',
                coordinates: [120.0985, 30.2499],
              },
            },
          ],
        }

        fullGeoJSON.current = initialData

        // 1. 添加数据源 (Source)
        map.current?.addSource('route-source', {
          type: 'geojson',
          data: initialData as any,
        })

        // 2. 添加路径图层 (Layer - Line)
        map.current?.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route-source',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': isDark ? '#FF8C42' : '#FF5733', // 暗色模式用更亮的橙色
            'line-width': 4,
          },
          filter: ['==', '$type', 'LineString'], // 只画线
        })

        // 3. 添加圆点图层 (Layer - Circle)
        map.current?.addLayer({
          id: 'route-points',
          type: 'circle',
          source: 'route-source',
          paint: {
            'circle-radius': 6,
            'circle-color': isDark ? '#FFFFFF' : '#000000', // 暗色模式用白色圆点
          },
          filter: ['==', '$type', 'Point'], // 只画点
        })
      })
    }
  }, [isDark]) // 依赖 isDark，当主题改变时重新初始化

  // 监听主题切换，动态更新地图样式
  useEffect(() => {
    if (!map.current || !isLoaded) return

    const mapStyle = isDark
      ? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
      : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

    // 切换地图样式
    map.current.setStyle(mapStyle)

    // 样式加载完成后，重新添加数据和图层
    map.current.once('styledata', () => {
      if (!fullGeoJSON.current || !map.current) return

      // 重新添加数据源
      if (!map.current.getSource('route-source')) {
        map.current.addSource('route-source', {
          type: 'geojson',
          data: fullGeoJSON.current as any,
        })

        // 重新添加路径图层
        map.current.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route-source',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': isDark ? '#FF8C42' : '#FF5733', // 暗色模式用更亮的橙色
            'line-width': 4,
          },
          filter: ['==', '$type', 'LineString'],
        })

        // 重新添加圆点图层
        map.current.addLayer({
          id: 'route-points',
          type: 'circle',
          source: 'route-source',
          paint: {
            'circle-radius': 6,
            'circle-color': isDark ? '#FFFFFF' : '#000000', // 暗色模式用白色圆点
          },
          filter: ['==', '$type', 'Point'],
        })
      }
    })
  }, [isDark, isLoaded])

  useEffect(() => {
    if (!isLoaded || !map.current || !fullGeoJSON.current || !$currentStopId) return

    // 1. 找到目标点
    const targetPoint = fullGeoJSON.current.features.find((f: any) => f.geometry.type === 'Point' && f.properties.slug === $currentStopId)

    if (targetPoint) {
      console.log('正在前往:', targetPoint.properties.name)

      // 2. 找到整条路线 (假设它是数据里的第一个 LineString)
      const routeLine = fullGeoJSON.current.features.find((f: any) => f.geometry.type === 'LineString')

      if (routeLine) {
        // 3. 核心魔法：切割路径！✂️
        // turf.lineSlice(起点, 终点, 原始路径)
        const slicedRoute = turf.lineSlice(
          turf.point(routeLine.geometry.coordinates[0]), // 路线起点
          targetPoint, // 刚才找到的目标点
          routeLine // 原始完整路线
        )

        // 4. 更新地图数据
        // 注意：我们要保留所有的点（Feature），但把路线替换成“切过”的路线
        const points = fullGeoJSON.current.features.filter((f: any) => f.geometry.type === 'Point')

        ;(map.current.getSource('route-source') as maplibregl.GeoJSONSource).setData({
          type: 'FeatureCollection',
          features: [...points, slicedRoute],
        })
      }
    }
  }, [$currentStopId, isLoaded]) // 当 ID 变了，或者地图刚加载完，就执行

  return (
    // 容器必须有高度，否则地图看不见
    <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
  )
}
