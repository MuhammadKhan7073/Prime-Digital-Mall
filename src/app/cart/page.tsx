'use client'

import Link from 'next/link'
import { ShoppingBag, Trash2, BookmarkPlus, ArrowRight, MessageCircle, ArrowLeft, RotateCcw } from 'lucide-react'
import { FREE_SHIP_THRESHOLD, bestsellers, getProduct } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'
import { variantSummary } from '@/lib/variant'
import { waCartOrder } from '@/lib/whatsapp'
import { useHydrated } from '@/lib/useHydrated'
import { cartSubtotal, lineUnitPrice, useCart } from '@/store/cart'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductImage } from '@/components/ui/ProductImage'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { FreeShipBar } from '@/components/FreeShipBar'
import { ProductRow } from '@/components/ProductRow'

const DELIVERY_FLAT = 199

export default function CartPage() {
  const hydrated = useHydrated()
  const items = useCart((s) => s.items)
  const saved = useCart((s) => s.saved)
  const setQty = useCart((s) => s.setQty)
  const remove = useCart((s) => s.remove)
  const saveForLater = useCart((s) => s.saveForLater)
  const moveToCart = useCart((s) => s.moveToCart)
  const removeSaved = useCart((s) => s.removeSaved)
  const subtotal = useCart(cartSubtotal)

  const delivery = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FLAT
  const total = subtotal + delivery

  if (hydrated && items.length === 0) {
    return (
      <div className="container-app">
        <Breadcrumbs items={[{ label: 'Cart' }]} />
        <div className="card mx-auto flex max-w-md flex-col items-center gap-3 p-12 text-center">
          <span className="text-5xl">🛒</span>
          <p className="text-lg font-bold text-ink">Your cart is empty</p>
          <p className="text-sm text-muted">Great deals are waiting. Checkout takes just seconds.</p>
          <Link href="/" className="btn-primary btn-lg mt-2">Start shopping</Link>
        </div>
        <div className="mt-10">
          <h2 className="container-app mb-3 text-lg font-extrabold text-ink">Bestsellers you’ll love</h2>
          <div className="container-app"><ProductRow products={bestsellers(10)} /></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-app">
      <Breadcrumbs items={[{ label: 'Cart' }]} />
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-brand-fg"><ShoppingBag size={20} /></span>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">Your Cart {hydrated && `(${items.length})`}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* items */}
        <div className="flex flex-col gap-3">
          {hydrated &&
            items.map((line) => {
              const p = getProduct(line.slug)
              if (!p) return null
              const unit = lineUnitPrice(line)
              const sum = variantSummary(line.variant)
              return (
                <div key={line.id} className="card flex gap-3 p-3">
                  <Link href={`/product/${p.slug}`} className="shrink-0">
                    <ProductImage from={p.from} to={p.to} emoji={p.emoji} className="h-24 w-24 rounded-xl" emojiClassName="text-4xl" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link href={`/product/${p.slug}`} className="line-clamp-2 font-semibold text-ink hover:text-brand">{p.name}</Link>
                    {sum && <span className="mt-0.5 text-xs text-faint">{sum}</span>}
                    <span className="mt-1 font-bold text-ink tabular">{formatPrice(unit)}</span>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityStepper value={line.qty} onChange={(n) => setQty(line.id, n)} />
                      <div className="flex items-center gap-1">
                        <button onClick={() => saveForLater(line.id)} className="grid h-9 w-9 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-brand" title="Save for later"><BookmarkPlus size={17} /></button>
                        <button onClick={() => remove(line.id)} className="grid h-9 w-9 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-deal" title="Remove"><Trash2 size={17} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

          <Link href="/" className="inline-flex w-fit items-center gap-1 text-sm font-medium text-muted hover:text-brand">
            <ArrowLeft size={15} /> Continue shopping
          </Link>

          {/* saved for later */}
          {hydrated && saved.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-3 text-base font-bold text-ink">Saved for later ({saved.length})</h2>
              <div className="flex flex-col gap-2">
                {saved.map((line) => {
                  const p = getProduct(line.slug)
                  if (!p) return null
                  return (
                    <div key={line.id} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-2.5">
                      <ProductImage from={p.from} to={p.to} emoji={p.emoji} className="h-14 w-14 rounded-lg" emojiClassName="text-2xl" />
                      <Link href={`/product/${p.slug}`} className="line-clamp-1 flex-1 text-sm font-medium text-ink hover:text-brand">{p.name}</Link>
                      <span className="text-sm font-bold text-ink tabular">{formatPrice(lineUnitPrice(line))}</span>
                      <button onClick={() => moveToCart(line.id)} className="btn-ghost btn-sm"><RotateCcw size={13} /> Move to cart</button>
                      <button onClick={() => removeSaved(line.id)} className="grid h-8 w-8 place-items-center rounded-lg text-faint hover:text-deal"><Trash2 size={15} /></button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* summary */}
        <aside className="h-fit lg:sticky lg:top-32">
          <div className="card flex flex-col gap-3 p-5">
            <FreeShipBar subtotal={subtotal} />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="font-semibold text-ink tabular">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd className="font-semibold tabular">{delivery === 0 ? <span className="text-success">FREE</span> : formatPrice(delivery)}</dd></div>
              <div className="flex justify-between border-t border-line pt-2 text-base"><dt className="font-bold text-ink">Total</dt><dd className="font-extrabold text-ink tabular">{formatPrice(total)}</dd></div>
            </dl>
            <Link href="/checkout" className="btn-primary btn-lg w-full">Proceed to checkout <ArrowRight size={18} /></Link>
            <a
              href={waCartOrder(items.map((l) => { const p = getProduct(l.slug); return { name: p?.name ?? l.slug, qty: l.qty, price: lineUnitPrice(l), variant: variantSummary(l.variant) } }), total)}
              target="_blank"
              rel="noreferrer"
              className="btn-wa btn-md w-full"
            >
              <MessageCircle size={17} /> Order on WhatsApp
            </a>
            <p className="text-center text-xs text-faint">Cash on delivery available · 7-day returns</p>
          </div>
        </aside>
      </div>

      {/* recommendations */}
      <div className="mt-10">
        <h2 className="mb-3 text-lg font-extrabold text-ink">You might also like</h2>
        <ProductRow products={bestsellers(12)} />
      </div>
    </div>
  )
}
