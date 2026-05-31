import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useTransitionVariant } from '../context/TransitionContext'

export type TransitionVariant = 'grand' | 'subtle'

const VARIANTS = {
  grand: {
    initial: { opacity: 0, y: 12, filter: 'blur(8px)' },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -12,
      filter: 'blur(8px)',
      transition: { duration: 0.35, ease: [0.4, 0, 0.6, 1] },
    },
  },
  subtle: {
    initial: { opacity: 0, y: 4 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -2,
      transition: { duration: 0.16, ease: [0.4, 0, 0.6, 1] },
    },
  },
} as const

export default function PageTransition({
  children,
  variant,
}: {
  children: ReactNode
  variant?: TransitionVariant
}) {
  const ctxVariant = useTransitionVariant()
  const v = VARIANTS[variant ?? ctxVariant]
  return (
    <motion.div
      initial={v.initial}
      animate={v.animate}
      exit={v.exit}
      style={{ minHeight: '100%', willChange: 'opacity, transform, filter' }}
    >
      {children}
    </motion.div>
  )
}
