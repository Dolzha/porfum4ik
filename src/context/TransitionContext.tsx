import { createContext, useContext } from 'react'
import type { TransitionVariant } from '../components/PageTransition'

export const TransitionContext = createContext<TransitionVariant>('grand')

export const useTransitionVariant = (): TransitionVariant =>
  useContext(TransitionContext)
