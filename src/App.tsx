import { useRef } from 'react'

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { CartProvider } from './context/CartContext'
import { TransitionContext } from './context/TransitionContext'
import type { TransitionVariant } from './components/PageTransition'
import HomePage from './pages/HomePage'
import NovinkiPage from './pages/NovinkiPage'
import TovaryPage from './pages/TovaryPage'
import SkidkiPage from './pages/SkidkiPage'
import CartPage from './pages/CartPage'
import SupportPage from './pages/SupportPage'

function pickVariant(prev: string | null, next: string): TransitionVariant {
  if (prev === null) return 'grand'
  if (prev === '/' || next === '/') return 'grand'
  return 'subtle'
}

function AnimatedRoutes() {
  const location = useLocation()
  const prevPathRef = useRef<string | null>(null)
  const variant = pickVariant(prevPathRef.current, location.pathname)
  prevPathRef.current = location.pathname

  return (
    <TransitionContext.Provider value={variant}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/novinki" element={<NovinkiPage />} />
          <Route path="/tovary" element={<TovaryPage />} />
          <Route path="/skidki" element={<SkidkiPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AnimatePresence>
    </TransitionContext.Provider>
  )
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </CartProvider>
  )
}
