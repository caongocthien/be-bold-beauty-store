import {
  FloatingPortal,
  useFloating,
  useHover,
  useInteractions,
  arrow,
  FloatingArrow,
  safePolygon,
  shift,
  offset
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'

interface Props {
  refElement?: React.ReactNode
  children?: React.ReactNode
}

export default function Popover({ refElement, children }: Props) {
  const arrowRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      shift(),
      offset(10),
      arrow({
        element: arrowRef
      })
    ]
  })
  const hover = useHover(context, {
    handleClose: safePolygon()
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  return (
    <div>
      <div className='flex' ref={refs.setReference} {...getReferenceProps()}>
        {refElement}
      </div>
      <AnimatePresence>
        {isOpen && (
          <FloatingPortal>
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                zIndex: 20
              }}
              {...getFloatingProps()}
              // framer motion
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            >
              <FloatingArrow
                ref={arrowRef}
                context={context}
                fill={'#fff'}
                stroke={'#d6d3d3'}
                strokeWidth={1}
                strokeOpacity={0.1}
              />
              {children}
            </motion.div>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </div>
  )
}
