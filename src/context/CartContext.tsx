import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { PRODUCTS, type Product } from '../data/products'

export interface CartItem {
  productId: string
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  add: (productId: string) => void
  remove: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clear: () => void
  getProduct: (productId: string) => Product | undefined
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'porfum4ik.cart.v1'

const loadFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (it): it is CartItem =>
        typeof it === 'object' &&
        it !== null &&
        typeof it.productId === 'string' &&
        typeof it.quantity === 'number' &&
        it.quantity > 0,
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadFromStorage)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore storage failures (quota, private mode)
    }
  }, [items])

  const add = useCallback((productId: string) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.productId === productId)
      if (existing) {
        return prev.map((it) =>
          it.productId === productId ? { ...it, quantity: it.quantity + 1 } : it,
        )
      }
      return [...prev, { productId, quantity: 1 }]
    })
  }, [])

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((it) => it.productId !== productId))
  }, [])

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((it) => it.productId !== productId))
      return
    }
    setItems((prev) =>
      prev.map((it) => (it.productId === productId ? { ...it, quantity } : it)),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const getProduct = useCallback(
    (productId: string) => PRODUCTS.find((p) => p.id === productId),
    [],
  )

  const { count, total } = useMemo(() => {
    let c = 0
    let t = 0
    for (const it of items) {
      const p = PRODUCTS.find((p) => p.id === it.productId)
      if (!p) continue
      c += it.quantity
      t += p.price * it.quantity
    }
    return { count: c, total: t }
  }, [items])

  const value: CartContextValue = {
    items,
    count,
    total,
    add,
    remove,
    setQuantity,
    clear,
    getProduct,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
