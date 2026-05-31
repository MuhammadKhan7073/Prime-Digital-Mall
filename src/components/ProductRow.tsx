import type { Product } from '@/data/types'
import { HScroll } from './HScroll'
import { ProductCard } from './ProductCard'

/** A horizontally scrolling row of product cards. */
export function ProductRow({ products }: { products: Product[] }) {
  return (
    <HScroll>
      {products.map((p) => (
        <div key={p.slug} className="w-[158px] shrink-0 snap-start sm:w-[200px]">
          <ProductCard product={p} />
        </div>
      ))}
    </HScroll>
  )
}
