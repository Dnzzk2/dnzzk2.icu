import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { currentStopId } from '~/stores/mapStore' // 引入我们的 Store

interface Props {
  id: string // 这一段对应的地点 ID (比如 'start-point')
  children: React.ReactNode
}

export default function Section({ id, children }: Props) {
  // threshold: 0.6 表示当这个元素有 60% 进入屏幕时，才触发
  // 这样可以避免刚露个头就乱跳
  const { ref, inView } = useInView({
    threshold: 0.6,
  })

  useEffect(() => {
    if (inView) {
      console.log(`滚动到了: ${id}`)
      currentStopId.set(id) // Update Store! 🚀
    }
  }, [inView, id])

  return (
    // 给它加一点 padding，保证阅读体验
    <div ref={ref} className="">
      {children}
    </div>
  )
}
