import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import PageTransition from '../components/PageTransition'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import bottle from '../assets/bottle.png'

export default function CartPage() {
  const { items, total, setQuantity, remove, getProduct, clear } = useCart()

  return (
    <PageTransition>
      <Header mode="flow" />
      <section className="mx-auto max-w-[1440px] px-[40px] py-[64px]">
        <header className="mb-[40px] flex items-end justify-between gap-[24px]">
          <div>
            <h1 className="text-[64px] font-light leading-[0.95] tracking-[-3.2px] text-black">
              Корзина
            </h1>
            <p className="mt-[12px] text-[18px] leading-[1.4] text-black/70">
              {items.length > 0
                ? 'Проверь состав и переходи к оформлению.'
                : 'Пока пусто — выбери аромат в каталоге.'}
            </p>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="text-[14px] text-black/50 underline decoration-dotted underline-offset-4 hover:text-black cursor-pointer"
            >
              очистить
            </button>
          )}
        </header>

        {items.length === 0 ? (
          <Link
            to="/tovary"
            className="inline-block px-[24px] py-[14px] rounded-[64px] border border-[#cfcfcf] bg-[#a4a091] text-white text-[16px] font-semibold tracking-[-0.48px] no-underline cursor-pointer hover:scale-[1.02] transition-transform duration-200 ease-out"
          >
            Перейти в каталог
          </Link>
        ) : (
          <div className="flex flex-col gap-[16px]">
            {items.map((it) => {
              const p = getProduct(it.productId)
              if (!p) return null
              return (
                <motion.div
                  key={it.productId}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-[24px] p-[16px] rounded-[24px] border border-black/10 bg-white"
                >
                  <div
                    className="relative size-[96px] flex-shrink-0 rounded-[16px] overflow-hidden"
                    style={{ backgroundColor: p.color }}
                  >
                    <img
                      src={bottle}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-[20px] font-medium tracking-[-0.6px] text-black">
                      {p.name}
                    </h3>
                    <p className="text-[14px] text-black/60 truncate">
                      {p.notes.join(' · ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-[8px] rounded-[24px] border border-black/15 px-[6px] py-[4px]">
                    <button
                      type="button"
                      aria-label="Уменьшить"
                      onClick={() => setQuantity(it.productId, it.quantity - 1)}
                      className="size-[28px] flex items-center justify-center rounded-full hover:bg-black/5 cursor-pointer text-[18px] leading-none"
                    >
                      −
                    </button>
                    <span className="min-w-[20px] text-center text-[16px] font-semibold tabular-nums">
                      {it.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Увеличить"
                      onClick={() => setQuantity(it.productId, it.quantity + 1)}
                      className="size-[28px] flex items-center justify-center rounded-full hover:bg-black/5 cursor-pointer text-[18px] leading-none"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-[140px] text-right">
                    <span className="text-[18px] font-semibold tracking-[-0.54px]">
                      {formatPrice(p.price * it.quantity)}
                    </span>
                  </div>

                  <button
                    type="button"
                    aria-label="Удалить"
                    onClick={() => remove(it.productId)}
                    className="size-[36px] flex items-center justify-center rounded-full border border-black/15 text-black/60 hover:bg-black/5 hover:text-black cursor-pointer text-[18px] leading-none"
                  >
                    ×
                  </button>
                </motion.div>
              )
            })}

            <div className="mt-[24px] flex items-center justify-end gap-[24px] py-[16px] border-t border-black/10">
              <span className="text-[18px] text-black/60">Итого</span>
              <span className="text-[28px] font-semibold tracking-[-0.84px]">
                {formatPrice(total)}
              </span>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="px-[28px] py-[16px] rounded-[64px] bg-[#a4a091] text-white text-[16px] font-bold tracking-[-0.48px] border border-[rgba(0,0,0,0.7)] cursor-pointer hover:scale-[1.02] transition-transform duration-200 ease-out"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        )}
      </section>
    </PageTransition>
  )
}
