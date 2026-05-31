'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Product } from '@/data/types'
import { isSoldOut } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'
import { defaultVariant } from '@/lib/variant'
import { ProductImage } from '@/components/ui/ProductImage'
import { useCart } from '@/store/cart'
import { useUI } from '@/store/ui'

/**
 * Mobile-only sticky purchase bar. Slides in once the main buy buttons scroll
 * away so the impulse path is never more than one tap from any scroll position.
 */
export function StickyBuyBar({ product }: { product: Product }) {
  const add = useCart((s) => s.add)
  const openCart = useUI((s) => s.openCart)
  const toast = useUI((s) => s.toast)
  const router = useRouter()
  const [show, setShow] = useState(false)
  const out = isSoldOut(product)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const quickAdd = () => {
    add(product.slug, 1, defaultVariant(product))
    toast('Added to cart', { href: '/cart', hrefLabel: 'View' })
    openCart()
  }
  const buyNow = () => {
    add(product.slug, 1, defaultVariant(product))
    router.push('/checkout')
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-14 z-40 border-t border-line bg-surface/95 backdrop-blur-lg transition-transform duration-300 lg:hidden ${
        show ? 'translate-y-0' : 'translate-y-[120%]'
      }`}
    >
      <div className="container-app flex items-center gap-3 py-2.5">
        <ProductImage from={product.from} to={product.to} emoji={product.emoji} className="h-11 w-11 shrink-0 rounded-lg" emojiClassName="text-xl" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-muted">{product.name}</p>
          <p className="text-sm font-extrabold text-ink tabular">{formatPrice(product.price)}</p>
        </div>
        {out ? (
          <span className="rounded-xl bg-elevated px-4 py-2 text-sm font-bold text-faint">Sold out</span>
        ) : (
          <>
            <button onClick={quickAdd} className="btn-ghost btn-md" aria-label="Add to cart">
              <ShoppingCart size={18} />
            </button>
            <button onClick={buyNow} className="btn-deal btn-md">
              <Zap size={16} className="fill-current" /> Buy now
            </button>
          </>
        )}
      </div>
    </div>
  )
}
