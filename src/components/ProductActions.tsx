'use client'

import { useRouter } from 'next/navigation'
import { ShoppingCart, Zap, MessageCircle, Truck, Check, RotateCcw, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import type { Product, Shop } from '@/data/types'
import { isLowStock, isSoldOut } from '@/lib/catalog'
import { defaultVariant } from '@/lib/variant'
import { formatPrice } from '@/lib/format'
import { waOrder } from '@/lib/whatsapp'
import { useCart } from '@/store/cart'
import { useUI } from '@/store/ui'
import { Price } from '@/components/ui/Price'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { VariantPicker } from '@/components/VariantPicker'
import { WishlistButton } from '@/components/WishlistButton'

export function ProductActions({ product, shop }: { product: Product; shop: Shop }) {
  const add = useCart((s) => s.add)
  const openCart = useUI((s) => s.openCart)
  const toast = useUI((s) => s.toast)
  const router = useRouter()
  const [variant, setVariant] = useState<Record<string, string>>(() => defaultVariant(product))
  const [qty, setQty] = useState(1)

  const out = isSoldOut(product)
  const low = isLowStock(product)
  const delta = (product.variantGroups ?? []).reduce((d, g) => d + (g.options.find((o) => o.value === variant[g.name])?.deltaRupees ?? 0), 0)
  const unit = product.price + delta

  const addToCart = () => {
    add(product.slug, qty, variant)
    toast('Added to cart', { href: '/cart', hrefLabel: 'View cart' })
    openCart()
  }
  const buyNow = () => {
    add(product.slug, qty, variant)
    router.push('/checkout')
  }

  return (
    <div className="flex flex-col gap-4">
      <Price price={unit} compareAt={product.compareAt ? product.compareAt + delta : undefined} size="lg" />

      {low && <p className="text-sm font-semibold text-warn">🔥 Only {product.stock} left — order before it’s gone</p>}
      {out && <p className="text-sm font-semibold text-deal">Currently sold out</p>}

      {product.variantGroups && (
        <VariantPicker groups={product.variantGroups} value={variant} onChange={(n, v) => setVariant((s) => ({ ...s, [n]: v }))} />
      )}

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted">Qty</span>
        <QuantityStepper value={qty} onChange={setQty} max={Math.max(1, product.stock || 99)} />
        <span className="text-sm text-faint">{formatPrice(unit * qty)} total</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={addToCart} disabled={out} className="btn-primary btn-lg">
          <ShoppingCart size={18} /> Add to cart
        </button>
        <button onClick={buyNow} disabled={out} className="btn-deal btn-lg">
          <Zap size={18} className="fill-current" /> Buy now
        </button>
      </div>

      <div className="flex items-center gap-2">
        <a href={waOrder(product, shop, { qty, variant })} target="_blank" rel="noreferrer" className="btn-wa btn-md flex-1">
          <MessageCircle size={17} /> Order on WhatsApp
        </a>
        <WishlistButton slug={product.slug} floating className="h-11 w-11" size={20} />
      </div>

      {/* trust strip */}
      <div className="grid grid-cols-3 gap-2 rounded-xl border border-line bg-elevated p-3 text-center">
        <div className="flex flex-col items-center gap-1 text-xs text-muted">
          <Truck size={18} className="text-brand" /> {product.freeShipping ? 'Free delivery' : 'Fast delivery'}
        </div>
        <div className="flex flex-col items-center gap-1 text-xs text-muted">
          <RotateCcw size={18} className="text-brand" /> 7-day returns
        </div>
        <div className="flex flex-col items-center gap-1 text-xs text-muted">
          <ShieldCheck size={18} className="text-brand" /> Cash on delivery
        </div>
      </div>
      <p className="flex items-center gap-1.5 text-xs text-success"><Check size={14} /> Buyer protection on every order</p>
    </div>
  )
}
