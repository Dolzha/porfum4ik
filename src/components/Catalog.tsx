import ProductCard from './ProductCard'
import type { Product } from '../data/products'

interface CatalogProps {
  title: string
  subtitle?: string
  products: Product[]
}

export default function Catalog({ title, subtitle, products }: CatalogProps) {
  return (
    <section className="mx-auto max-w-[1440px] px-[40px] py-[64px]">
      <header className="mb-[40px]">
        <h1 className="text-[64px] font-light leading-[0.95] tracking-[-3.2px] text-black">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-[12px] max-w-[640px] text-[18px] leading-[1.4] text-black/70">
            {subtitle}
          </p>
        )}
      </header>

      {products.length === 0 ? (
        <p className="text-[18px] text-black/60">Здесь пока пусто. Скоро добавим.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  )
}
