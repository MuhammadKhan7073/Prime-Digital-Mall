'use client'

import Link from 'next/link'
import { Heart, Trash2 } from 'lucide-react'
import { getProducts } from '@/lib/catalog'
import { useHydrated } from '@/lib/useHydrated'
import { useWishlist } from '@/store/wishlist'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductGrid } from '@/components/ProductGrid'

export default function WishlistPage() {
  const hydrated = useHydrated()
  const slugs = useWishlist((s) => s.slugs)
  const clear = useWishlist((s) => s.clear)
  const products = getProducts(slugs)

  return (
    <div className="container-app">
      <Breadcrumbs items={[{ label: 'Wishlist' }]} />
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-deal/15 text-deal"><Heart size={20} className="fill-deal" /></span>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-ink">Your Wishlist</h1>
            <p className="text-sm text-muted">{hydrated ? `${products.length} saved` : 'Loading…'}</p>
          </div>
        </div>
        {hydrated && products.length > 0 && (
          <button onClick={clear} className="btn-ghost btn-sm"><Trash2 size={14} /> Clear</button>
        )}
      </div>

      {!hydrated ? null : products.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 p-12 text-center">
          <span className="text-5xl">💝</span>
          <p className="font-semibold text-ink">Nothing saved yet</p>
          <p className="text-sm text-muted">Tap the heart on any product to save it for later.</p>
          <Link href="/" className="btn-primary btn-md mt-2">Start shopping</Link>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  )
}
