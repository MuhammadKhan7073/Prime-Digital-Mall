'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { X, Truck, Check, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { formatPrice } from '@/lib/format'
import { getProduct, isLowStock, isSoldOut, shopOf } from '@/lib/catalog'
import { defaultVariant } from '@/lib/variant'
import { useCart } from '@/store/cart'
import { useUI } from '@/store/ui'
import { ProductImage } from '@/components/ui/ProductImage'
import { Stars } from '@/components/ui/Stars'
import { Price } from '@/components/ui/Price'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { VariantPicker } from '@/components/VariantPicker'
import { WishlistButton } from '@/components/WishlistButton'

export function QuickViewModal() {
  const slug = useUI((s) => s.quickView)
  const close = useUI((s) => s.closeQuickView)
  const openCart = useUI((s) => s.openCart)
  const toast = useUI((s) => s.toast)
  const add = useCart((s) => s.add)
  const router = useRouter()

  const product = slug ? getProduct(slug) : undefined
  const [variant, setVariant] = useState<Record<string, string>>({})
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (product) {
      setVariant(defaultVariant(product))
      setQty(1)
    }
  }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!slug || !product) return null
  const shop = shopOf(product)
  const out = isSoldOut(product)
  const low = isLowStock(product)

  const unit =
    product.price +
    (product.variantGroups ?? []).reduce((d, g) => d + (g.options.find((o) => o.value === variant[g.name])?.deltaRupees ?? 0), 0)

  const addToCart = () => {
    add(product.slug, qty, variant)
    toast('Added to cart', { href: '/cart', hrefLabel: 'View cart' })
    close()
    openCart()
  }
  const buyNow = () => {
    add(product.slug, qty, variant)
    close()
    router.push('/checkout')
  }

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4">
      <button aria-label="Close" className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-fade-in" onClick={close} />
      <div className="relative grid max-h-[90vh] w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl border border-line bg-surface shadow-pop animate-scale-in sm:grid-cols-2">
        <button onClick={close} className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-surface/90 text-faint shadow-card backdrop-blur hover:text-ink">
          <X size={18} />
        </button>

        <div className="relative">
          <ProductImage from={product.from} to={product.to} emoji={product.emoji} className="h-56 w-full sm:h-full sm:min-h-[24rem]" emojiClassName="text-8xl" />
        </div>

        <div className="flex max-h-[90vh] flex-col overflow-y-auto p-5">
          {shop && (
            <Link href={`/shop/${shop.slug}`} onClick={close} className="text-xs font-medium text-faint hover:text-brand">
              {shop.emoji} {shop.name}
            </Link>
          )}
          <h2 className="mt-1 text-xl font-extrabold leading-snug text-ink">{product.name}</h2>
          <div className="mt-1.5 flex items-center gap-2">
            <Stars rating={product.rating} count={product.reviewCount} showValue />
          </div>
          <div className="mt-3">
            <Price price={unit} compareAt={product.compareAt && product.compareAt + (unit - product.price)} size="lg" />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">{product.shortDesc}</p>

          {product.variantGroups && (
            <div className="mt-4">
              <VariantPicker groups={product.variantGroups} value={variant} onChange={(n, v) => setVariant((s) => ({ ...s, [n]: v }))} />
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
            {product.freeShipping && (
              <span className="inline-flex items-center gap-1 font-medium text-success">
                <Truck size={13} /> Free delivery
              </span>
            )}
            {low && <span className="font-semibold text-warn">Only {product.stock} left — order soon</span>}
            {!out && !low && <span className="inline-flex items-center gap-1 text-success"><Check size={13} /> In stock</span>}
          </div>

          <div className="mt-auto pt-4">
            <div className="flex items-center gap-3">
              <QuantityStepper value={qty} onChange={setQty} max={Math.max(1, product.stock || 99)} />
              <WishlistButton slug={product.slug} floating />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={addToCart} disabled={out} className="btn-primary btn-lg">
                {out ? 'Sold out' : 'Add to cart'}
              </button>
              <button onClick={buyNow} disabled={out} className="btn-deal btn-lg">
                Buy now
              </button>
            </div>
            <Link href={`/product/${product.slug}`} onClick={close} className="mt-2 flex items-center justify-center gap-1 text-sm font-medium text-muted hover:text-brand">
              Full details <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
