'use client'

import { recommendedFor } from '@/lib/catalog'
import { useHydrated } from '@/lib/useHydrated'
import { useCart } from '@/store/cart'
import { ProductRow } from '@/components/ProductRow'

/** Cart recommendations driven by what's already in the cart. */
export function CartCrossSell() {
  const hydrated = useHydrated()
  const items = useCart((s) => s.items)
  const slugs = hydrated ? items.map((i) => i.slug) : []
  const recs = recommendedFor(slugs, 12)
  if (recs.length === 0) return null
  return (
    <div className="mt-10">
      <h2 className="mb-3 text-lg font-extrabold text-ink">{slugs.length ? 'Customers also bought' : 'You might also like'}</h2>
      <ProductRow products={recs} />
    </div>
  )
}
