'use client'

import Link from 'next/link'
import { X, ShoppingBag, Trash2, BookmarkPlus, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/format'
import { getProduct } from '@/lib/catalog'
import { variantSummary } from '@/lib/variant'
import { useHydrated } from '@/lib/useHydrated'
import { cartSubtotal, lineUnitPrice, useCart } from '@/store/cart'
import { useUI } from '@/store/ui'
import { ProductImage } from '@/components/ui/ProductImage'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { FreeShipBar } from '@/components/FreeShipBar'

export function CartDrawer() {
  const open = useUI((s) => s.cartOpen)
  const close = useUI((s) => s.closeCart)
  const hydrated = useHydrated()
  const items = useCart((s) => s.items)
  const setQty = useCart((s) => s.setQty)
  const remove = useCart((s) => s.remove)
  const saveForLater = useCart((s) => s.saveForLater)
  const subtotal = useCart(cartSubtotal)

  return (
    <>
      <div
        className={cn('fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm transition-opacity', open ? 'opacity-100' : 'pointer-events-none opacity-0')}
        onClick={close}
        aria-hidden
      />
      <aside
        className={cn(
          'fixed right-0 top-0 z-[81] flex h-full w-full max-w-md flex-col bg-bg shadow-pop transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-label="Shopping cart"
      >
        <header className="flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="flex items-center gap-2 font-bold text-ink">
            <ShoppingBag size={18} className="text-brand" /> Your Cart
            {hydrated && items.length > 0 && <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-bold text-brand">{items.length}</span>}
          </h2>
          <button onClick={close} className="grid h-8 w-8 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-ink">
            <X size={18} />
          </button>
        </header>

        {!hydrated || items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-elevated text-3xl">🛒</div>
            <p className="font-semibold text-ink">Your cart is empty</p>
            <p className="text-sm text-muted">Find something you love — checkout takes seconds.</p>
            <button onClick={close} className="btn-primary btn-md mt-2">
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <FreeShipBar className="mb-3" subtotal={subtotal} />
              <ul className="flex flex-col gap-3">
                {items.map((line) => {
                  const p = getProduct(line.slug)
                  if (!p) return null
                  const unit = lineUnitPrice(line)
                  const sum = variantSummary(line.variant)
                  return (
                    <li key={line.id} className="flex gap-3">
                      <Link href={`/product/${p.slug}`} onClick={close} className="shrink-0">
                        <ProductImage from={p.from} to={p.to} emoji={p.emoji} className="h-20 w-20 rounded-xl" emojiClassName="text-3xl" />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <Link href={`/product/${p.slug}`} onClick={close} className="line-clamp-2 text-sm font-semibold text-ink hover:text-brand">
                          {p.name}
                        </Link>
                        {sum && <span className="mt-0.5 text-xs text-faint">{sum}</span>}
                        <span className="mt-0.5 text-sm font-bold text-ink tabular">{formatPrice(unit)}</span>
                        <div className="mt-auto flex items-center justify-between pt-1.5">
                          <QuantityStepper value={line.qty} onChange={(n) => setQty(line.id, n)} />
                          <div className="flex items-center gap-1">
                            <button onClick={() => saveForLater(line.id)} title="Save for later" className="grid h-8 w-8 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-brand">
                              <BookmarkPlus size={16} />
                            </button>
                            <button onClick={() => remove(line.id)} title="Remove" className="grid h-8 w-8 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-deal">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <footer className="border-t border-line bg-surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted">Subtotal</span>
                <span className="text-lg font-extrabold text-ink tabular">{formatPrice(subtotal)}</span>
              </div>
              <Link href="/checkout" onClick={close} className="btn-primary btn-lg w-full">
                Checkout <ArrowRight size={18} />
              </Link>
              <button onClick={close} className="mt-2 w-full text-center text-sm font-medium text-muted hover:text-ink">
                Continue shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}
