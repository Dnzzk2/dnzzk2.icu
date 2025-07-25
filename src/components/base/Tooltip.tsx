import { useRef, useState, createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useFloating, autoUpdate, offset, shift, arrow, FloatingPortal, flip } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

// 单例 Tooltip 上下文
interface TooltipContextType {
  showTooltip: (element: HTMLElement, content: string) => void
  hideTooltip: () => void
}

const TooltipContext = createContext<TooltipContextType | null>(null)

// 单例 Tooltip Provider
export function TooltipProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  const {
    refs,
    floatingStyles,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    elements: {
      reference: referenceElement,
    },
    middleware: [
      offset(8),
      flip(),
      shift({
        padding: 8,
        crossAxis: true,
      }),
      arrow({ element: arrowRef }),
    ],
  })

  const showTooltip = (element: HTMLElement, tooltipContent: string) => {
    setReferenceElement(element)
    setContent(tooltipContent)
    setIsOpen(true)
  }

  const hideTooltip = () => {
    setIsOpen(false)
  }

  // 根据 placement 确定动画方向
  const getAnimationDirection = () => {
    return placement.startsWith('bottom') ? -10 : 10
  }

  return (
    <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <div ref={refs.setFloating} style={floatingStyles} className="z-50">
              <motion.div
                className="px-2 py-1 text-xs bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 whitespace-nowrap shadow-lg"
                initial={{
                  opacity: 0,
                  y: getAnimationDirection(),
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  y: getAnimationDirection(),
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  type: 'tween',
                  duration: 0.1,
                }}
              >
                {content}
              </motion.div>
              <div
                ref={arrowRef}
                style={{
                  position: 'absolute',
                  left: arrowX != null ? `${arrowX}px` : '',
                  top: arrowY != null ? `${arrowY}px` : '',
                  width: '6px',
                  height: '6px',
                  background: 'inherit',
                  transform: 'rotate(45deg)',
                  zIndex: -1,
                }}
              />
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </TooltipContext.Provider>
  )
}

// 单例 Tooltip 组件
export default function Tooltip({
  content,
  children,
  className = '',
  disabled = false,
}: {
  content: string
  children: ReactNode
  className?: string
  disabled?: boolean
}) {
  const tooltipContext = useContext(TooltipContext)
  const ref = useRef<HTMLDivElement>(null)

  if (!tooltipContext) {
    throw new Error('Tooltip must be used within TooltipProvider')
  }

  const { showTooltip, hideTooltip } = tooltipContext

  return (
    <div
      ref={ref}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => !disabled && ref.current && showTooltip(ref.current, content)}
      onMouseLeave={() => !disabled && hideTooltip()}
    >
      {children}
    </div>
  )
}
