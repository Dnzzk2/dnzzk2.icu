import React from 'react'
import { motion, useInView } from 'framer-motion'
import type { Photo } from '~/types'
import { cn } from '~/lib/utils'
import PolaroidCard from './PolaroidCard'

interface Props {
  photos: Photo[]
  title: string
  className?: string
}

// 生成随机旋转角度
const generateRotations = (count: number) => Array.from({ length: count }, () => Math.random() * 20 - 10) // -10 to +10 degrees

const PolaroidStack: React.FC<Props> = ({ photos, title, className }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })

  // 为每张照片生成固定的旋转角度
  const photoRotations = React.useMemo(() => generateRotations(photos.length), [photos.length])

  return (
    <motion.div ref={ref} className={cn('relative perspective-1000 ml-4 flex items-center', className)}>
      {photos.map((photo, index) => (
        <PolaroidCard
          key={photo.src}
          photo={photo}
          index={index}
          totalPhotos={photos.length}
          rotation={photoRotations[index]}
          variant={photo.variant}
          isVisible={isInView}
        />
      ))}
    </motion.div>
  )
}

export default PolaroidStack
