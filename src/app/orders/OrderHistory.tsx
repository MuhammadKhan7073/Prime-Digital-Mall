'use client'

import Link from 'next/link'
import { Package, ShoppingBag, UtensilsCrossed, RotateCcw, Trash2, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/format'
import { allProducts } from '@/lib/catalog'
import { useHydrated } from '@/lib/useHydrated'
import { useOrders, type Order, type OrderStatus } from '@/store/orders'
import { useCart } from '@/store/cart'
import { useUI } from '@/store/ui'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const STATUS_STYLE: Record<OrderStatus, string> = {
  placed: 'bg-warn/15 text-warn',
  confirmed: 'bg-sky-500/15 text-sky-500',
  shipped: 'bg-violet-500/15 text-violet-500',
  delivered: 'bg-success/15 text-success',
  cancelled: 'bg-deal/15 text-deal',
}

const STEPS: OrderStatus[] = ['placed', 'confirmed', 'shipped', 'delivered']

export function OrderHistory() {
  const hydrated = useHydrated()
  const orders = useOrders((s) => s.orders)
  const removeOrder = useOrders((s) => s.remove)
  const addToCart = useCart((s) => s.add)
  const openCart = useUI((s) => s.openCart)
  const toast = useUI((s) => s.toast)

  const reorder = (o: Order) => {
    if (o.kind === 'food') { toast('Food reorder: open the restaurant to add items', { kind: 'info' }); return }
    let added = 0
    for (const it of o.items) {
      const p = allProducts.find((x) => x.name === it.name)
      if (p) { addToCart(p.slug, it.qty, {}); added++ }
    }
    toast(added ? `Re-added ${added} item${added > 1 ? 's' : ''} to cart` : 'Items no longer available', { kind: added ? 'success' : 'info', href: '/cart', hrefLabel: 'View cart' })
    if (added) openCart()
  }

  return (
    <div className="container-app max-w-3xl">
      <Breadcrumbs items={[{ label: 'My Orders' }]} />
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-brand-fg"><Package size={20} /></span>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">My Orders</h1>
          <p className="text-sm text-muted">{hydrated ? `${orders.length} order${orders.length === 1 ? '' : 's'}` : 'Loading…'}</p>
        </div>
      </div>

      {!hydrated ? null : orders.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 p-12 text-center">
          <span className="text-5xl">📦</span>
          <p className="font-semibold text-ink">No orders yet</p>
          <p className="text-sm text-muted">Your orders will show here after checkout — with one-tap reorder.</p>
          <Link href="/shop" className="btn-primary btn-md mt-2">Start shopping</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((o) => {
            const Icon = o.kind === 'food' ? UtensilsCrossed : ShoppingBag
            const stepIdx = STEPS.indexOf(o.status)
            return (
              <div key={o.id} className="card p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-elevated text-muted"><Icon size={18} /></span>
                    <div>
                      <p className="flex items-center gap-2 font-bold text-ink">{o.id}
                        <span className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase', STATUS_STYLE[o.status])}>{o.status}</span>
                      </p>
                      <p className="text-xs text-muted">{o.items.reduce((n, i) => n + i.qty, 0)} items · {formatPrice(o.total)}{o.restaurant ? ` · ${o.restaurant}` : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => reorder(o)} className="btn-ghost btn-sm"><RotateCcw size={14} /> Reorder</button>
                    <button onClick={() => removeOrder(o.id)} className="grid h-8 w-8 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-deal" title="Remove"><Trash2 size={15} /></button>
                  </div>
                </div>

                {/* progress tracker */}
                {o.status !== 'cancelled' && (
                  <div className="mt-3 flex items-center gap-1">
                    {STEPS.map((s, i) => (
                      <div key={s} className="flex flex-1 items-center gap-1">
                        <span className={cn('h-1.5 flex-1 rounded-full', i <= stepIdx ? 'bg-brand' : 'bg-line')} />
                        {i < STEPS.length - 1 && <ChevronRight size={10} className={cn(i < stepIdx ? 'text-brand' : 'text-line')} />}
                      </div>
                    ))}
                  </div>
                )}
                {o.status !== 'cancelled' && (
                  <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wide text-faint">
                    {STEPS.map((s) => <span key={s}>{s}</span>)}
                  </div>
                )}

                {/* items */}
                <ul className="mt-3 space-y-1 border-t border-line pt-2 text-sm">
                  {o.items.map((it, i) => (
                    <li key={i} className="flex justify-between gap-2 text-muted">
                      <span className="truncate">{it.name}{it.variant ? ` (${it.variant})` : ''} × {it.qty}</span>
                      <span className="shrink-0 tabular">{formatPrice(it.price * it.qty)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
