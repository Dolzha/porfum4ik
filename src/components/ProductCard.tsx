import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice, type Product } from '../data/products'
import bottleCutout from '../assets/bottle-cutout.png'

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const hasDiscount = product.oldPrice !== undefined && product.oldPrice > product.price

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col rounded-[24px] overflow-hidden border border-black/10 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
    >
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden no-underline bg-white"
        aria-label={product.name}
      >
        <img
          src={bottleCutout}
          alt=""
          className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 ease-out hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-color"
          style={{
            backgroundColor: product.color,
            WebkitMaskImage: `url(${bottleCutout})`,
            maskImage: `url(${bottleCutout})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        />
        {hasDiscount && (
          <span className="absolute top-[12px] left-[12px] px-[10px] py-[4px] rounded-full bg-[#6c6769] text-white text-[12px] font-semibold tracking-[-0.36px] leading-none z-10">
            Скидка
          </span>
        )}
      </Link>

      <div className="flex flex-col gap-[8px] p-[20px]">
        <h3 className="text-[22px] font-medium leading-[1.2] tracking-[-0.66px] text-black">
          {product.name}
        </h3>
        <p className="text-[14px] leading-[1.4] text-black/70 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        <div className="flex items-end justify-between gap-[12px] mt-[8px]">
          <div className="flex flex-col">
            <span className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-black">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && product.oldPrice && (
              <span className="text-[14px] text-black/40 line-through leading-[1.2]">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <motion.button
            type="button"
            onClick={() => add(product.id)}
            whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
            className="px-[16px] py-[10px] rounded-[24px] bg-[#a4a091] text-white text-[14px] font-semibold tracking-[-0.42px] leading-none cursor-pointer border border-[rgba(0,0,0,0.7)]"
          >
            В корзину
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
