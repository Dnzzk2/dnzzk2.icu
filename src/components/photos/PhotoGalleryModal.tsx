import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { Photo } from '~/types'

interface Props {
  photos: Photo[]
  title: string
  description?: string
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

const PhotoGalleryModal: React.FC<Props> = ({ photos, title, description, isOpen, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // 弹窗打开时直接设置到目标图片
      setCurrentIndex(initialIndex)
      setShouldAnimate(false)
      // 延迟启用动画，确保初始位置设置完成
      const timer = setTimeout(() => setShouldAnimate(true), 50)
      return () => clearTimeout(timer)
    } else {
      setShouldAnimate(false)
    }
  }, [isOpen, initialIndex])

  const nextPhoto = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevPhoto = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft' && currentIndex > 0) prevPhoto()
    if (e.key === 'ArrowRight' && currentIndex < photos.length - 1) nextPhoto()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, photos.length])

  useEffect(() => {
    if (isOpen) {
      // 计算滚动条宽度
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      // 禁止滚动并补偿滚动条宽度
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      // 恢复原状
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  if (photos.length === 0) return null

  const currentPhoto = photos[currentIndex]

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* 遮罩层 - 添加动画配合 */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          />

          {/* 弹窗卡片 - 重新设计动效 */}
          <motion.div
            className="relative bg-background shadow-2xl max-w-lg w-full mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.9 }}
            transition={{
              duration: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 0.25 },
            }}
          >
            {/* 头部标题区域 */}
            <div className="border-gray-100 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                  {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
                </div>
                <div
                  className="w-5 h-5 icon-[mdi--close] text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  onClick={onClose}
                ></div>
              </div>
            </div>

            {/* 图片展示区域 */}
            <div className="relative bg-background">
              <div className="relative overflow-hidden">
                <motion.div
                  className="flex gap-4"
                  initial={false}
                  animate={{ x: `calc(-${currentIndex * 100}% - ${currentIndex * 1}rem)` }}
                  transition={shouldAnimate ? { type: 'tween', duration: 0.6, ease: [0.2, 0, 0.2, 1] } : { duration: 0 }}
                >
                  {photos.map((photo, index) => (
                    <div key={photo.src} className="min-w-0 shrink-0 grow-0 basis-full flex items-center justify-center">
                      <img draggable={false} src={photo.src} alt={photo.alt} className="max-w-full max-h-full object-contain select-none" />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* 左右导航按钮 */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    disabled={currentIndex === 0}
                    className={`absolute w-8 h-8 -left-10 top-1/2 -translate-y-1/2 shadow-lg transition-all flex items-center justify-center ${
                      currentIndex === 0
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-background hover:bg-accent text-foreground hover:text-accent-foreground'
                    }`}
                    aria-label="上一张"
                  >
                    <div className="w-5 h-5 icon-[mdi--chevron-left]"></div>
                  </button>
                  <button
                    onClick={nextPhoto}
                    disabled={currentIndex === photos.length - 1}
                    className={`absolute w-8 h-8 -right-10 top-1/2 -translate-y-1/2 shadow-lg transition-all flex items-center justify-center ${
                      currentIndex === photos.length - 1
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-background hover:bg-accent text-foreground hover:text-accent-foreground'
                    }`}
                    aria-label="下一张"
                  >
                    <div className="w-5 h-5 icon-[mdi--chevron-right]"></div>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // 使用 Portal 将弹窗渲染到 body
  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null
}

export default PhotoGalleryModal
