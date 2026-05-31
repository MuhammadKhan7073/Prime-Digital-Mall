'use client'

import { ShoppingBag } from 'lucide-react'
import { formatPrice } from '@/lib/format'
import { defaultVariant } from '@/lib/variant'
import { getProduct, isSoldOut } from '@/lib/catalog'
import { useCart } from '@/store/cart'
import { useUI } from '@/store/ui'

/**
 * Adds every in-stock item of a "frequently bought together" bundle to the cart
 * in a single tap — the classic basket-builder upsell.
 */
export function BundleAddButton({ slugs, total }: { slugs: string[]; total: number }) {
  const add = useCart((s) => s.add)
  const openCart = useUI((s) => s.openCart)
  const toast = useUI((s) => s.toast)

  const inStock = slugs.map(getProduct).filter((p) => p && !isSoldOut(p))
  const allOut = inStock.length === 0

  const addBundle = () => {
    for (const p of inStock) if (p) add(p.slug, 1, defaultVariant(p))
    toast(`Added ${inStock.length} items to cart`, { href: '/cart', hrefLabel: 'View cart' })
    openCart()
  }

  return (
    <button onClick={addBundle} disabled={allOut} className="btn-primary btn-md w-full">
      <ShoppingBag size={17} /> Add {inStock.length === slugs.length ? 'all' : `${inStock.length}`} to cart · {formatPrice(total)}
    </button>
  )
}
