import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { currentStopId, currentZoom, currentCenter } from '~/stores/mapStore' // 引入我们的 Store

interface Props {
  id: string // 这一段对应的地点 ID (比如 'start-point')
  zoom?: number
  center?: [number, number] // 地图中心点坐标
  children: React.ReactNode
}

export default function Section({ id, zoom, center, children }: Props) {
  // threshold: 0.6 表示当这个元素有 60% 进入屏幕时，才触发
  // 这样可以避免刚露个头就乱跳
  const { ref, inView } = useInView({
    threshold: 0.6,
  })

  useEffect(() => {
    if (inView) {
      // console.log(`滚动到了: ${id}`)
      currentStopId.set(id) // Update Store! 🚀
      if (zoom !== undefined) {
        currentZoom.set(zoom)
      }
      if (center !== undefined) {
        currentCenter.set(center)
      }
    }
  }, [inView, id, zoom, center])

  return (
    // 给它加一点 padding，保证阅读体验
    <div ref={ref} className="">
      {children}
    </div>
  )
}
