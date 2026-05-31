import Link from 'next/link'
import { Truck } from 'lucide-react'
import type { Product } from '@/data/types'
import { discountPct, isLowStock, isOnSale, isSoldOut, shopOf } from '@/lib/catalog'
import { formatCompact } from '@/lib/format'
import { ProductImage } from '@/components/ui/ProductImage'
import { Stars } from '@/components/ui/Stars'
import { Price } from '@/components/ui/Price'
import { Badge } from '@/components/ui/Badge'
import { WishlistButton } from '@/components/WishlistButton'
import { AddToCartButton } from '@/components/AddToCartButton'
import { QuickViewButton } from '@/components/QuickViewButton'

export function ProductCard({ product }: { product: Product }) {
  const shop = shopOf(product)
  const out = isSoldOut(product)
  const sale = isOnSale(product)
  const low = isLowStock(product)

  return (
    <div data-entity={`shop:listing:${product.slug}`} className="group card relative flex flex-col overflow-hidden transition-shadow hover:shadow-pop">
      {/* media */}
      <Link href={`/product/${product.slug}`} className="relative block">
        <ProductImage from={product.from} to={product.to} emoji={product.emoji} className="aspect-square w-full" emojiClassName="text-6xl" />

        {/* top-left badge stack */}
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
          {sale && <Badge variant="flash">-{discountPct(product)}%</Badge>}
          {!sale && product.tags.includes('bestseller') && <Badge variant="bestseller" />}
          {!sale && !product.tags.includes('bestseller') && product.tags.includes('new') && <Badge variant="new" />}
        </div>

        {/* quick view on hover (desktop) */}
        {!out && (
          <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
            <QuickViewButton slug={product.slug} />
          </div>
        )}

        {out && (
          <div className="absolute inset-0 grid place-items-center bg-bg/60 backdrop-blur-[1px]">
            <span className="rounded-lg bg-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-bg">Sold out</span>
          </div>
        )}
      </Link>

      <WishlistButton slug={product.slug} floating className="absolute right-2 top-2" />

      {/* body */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        {shop && (
          <Link href={`/shop/${shop.slug}`} className="truncate text-xs font-medium text-faint hover:text-brand">
            {shop.emoji} {shop.name}
          </Link>
        )}
        <Link href={`/product/${product.slug}`} className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-ink hover:text-brand">
          {product.name}
        </Link>

        <Stars rating={product.rating} count={product.reviewCount} />

        <div className="mt-0.5 flex items-center justify-between gap-2">
          <Price price={product.price} compareAt={product.compareAt} />
        </div>

        <div className="flex min-h-[1.25rem] flex-wrap items-center gap-x-2 gap-y-1 text-[11px]">
          {product.freeShipping && (
            <span className="inline-flex items-center gap-1 font-medium text-success">
              <Truck size={12} /> Free delivery
            </span>
          )}
          {low && <span className="font-semibold text-warn">Only {product.stock} left</span>}
          {!low && product.sold > 500 && <span className="text-faint">{formatCompact(product.sold)} sold</span>}
        </div>

        <div className="mt-auto pt-2">
          <AddToCartButton product={product} size="sm" full label="Add" />
        </div>
      </div>
    </div>
  )
}
