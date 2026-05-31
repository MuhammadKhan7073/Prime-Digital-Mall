'use client'

import { useMemo, useState } from 'react'
import { Package, ShoppingBag, UtensilsCrossed, Trash2, Search, ChevronRight, MapPin, Phone } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/format'
import { useOrders, ORDER_FLOW, type Order, type OrderStatus } from '@/store/orders'

const STATUS_STYLE: Record<OrderStatus, string> = {
  placed: 'bg-warn/15 text-warn',
  confirmed: 'bg-sky-500/15 text-sky-500',
  shipped: 'bg-violet-500/15 text-violet-500',
  delivered: 'bg-success/15 text-success',
  cancelled: 'bg-deal/15 text-deal',
}

function nextStatus(s: OrderStatus): OrderStatus | null {
  const i = ORDER_FLOW.indexOf(s)
  if (i < 0 || i >= ORDER_FLOW.length - 1) return null
  return ORDER_FLOW[i + 1]
}

export function OrdersTab() {
  const orders = useOrders((s) => s.orders)
  const setStatus = useOrders((s) => s.setStatus)
  const remove = useOrders((s) => s.remove)
  const [filter, setFilter] = useState<'all' | OrderStatus>('all')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<string | null>(null)

  const stats = useMemo(() => ({
    total: orders.length,
    placed: orders.filter((o) => o.status === 'placed').length,
    revenue: orders.filter((o) => o.status !== 'cancelled').reduce((n, o) => n + o.total, 0),
  }), [orders])

  const shown = useMemo(() => {
    let list = orders
    if (filter !== 'all') list = list.filter((o) => o.status === filter)
    if (q.trim()) { const t = q.toLowerCase(); list = list.filter((o) => `${o.id} ${o.name} ${o.phone} ${o.city}`.toLowerCase().includes(t)) }
    return list
  }, [orders, filter, q])

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-4"><p className="text-xs text-muted">Orders</p><p className="text-2xl font-extrabold text-ink tabular">{stats.total}</p></div>
        <div className="card p-4"><p className="text-xs text-muted">New (placed)</p><p className="text-2xl font-extrabold text-warn tabular">{stats.placed}</p></div>
        <div className="card p-4"><p className="text-xs text-muted">Revenue</p><p className="text-2xl font-extrabold text-success tabular">{formatPrice(stats.revenue)}</p></div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1 overflow-x-auto rounded-xl border border-line bg-surface p-1 no-scrollbar">
          {(['all', 'placed', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn('shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium capitalize', filter === f ? 'bg-brand text-brand-fg' : 'text-muted hover:text-ink')}>{f}</button>
          ))}
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-surface px-3">
          <Search size={15} className="text-faint" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search orders…" className="h-9 w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint" />
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="card flex flex-col items-center gap-2 p-12 text-center">
          <span className="text-4xl">📦</span>
          <p className="font-semibold text-ink">No {filter !== 'all' ? filter : ''} orders</p>
          <p className="text-sm text-muted">Orders placed at checkout appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {shown.map((o) => <OrderRow key={o.id} o={o} open={open === o.id} onToggle={() => setOpen(open === o.id ? null : o.id)} setStatus={setStatus} remove={remove} />)}
        </div>
      )}
    </div>
  )
}

function OrderRow({ o, open, onToggle, setStatus, remove }: { o: Order; open: boolean; onToggle: () => void; setStatus: (id: string, s: OrderStatus) => void; remove: (id: string) => void }) {
  const Icon = o.kind === 'food' ? UtensilsCrossed : ShoppingBag
  const next = nextStatus(o.status)
  const count = o.items.reduce((n, i) => n + i.qty, 0)

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3">
        <button onClick={onToggle} className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-elevated text-muted"><Icon size={18} /></span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-ink">{o.id}</span>
              <span className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase', STATUS_STYLE[o.status])}>{o.status}</span>
              <span className="rounded-md bg-elevated px-1.5 py-0.5 text-[10px] font-semibold capitalize text-muted">{o.kind}</span>
            </div>
            <p className="truncate text-xs text-muted">{o.name} · {count} item{count > 1 ? 's' : ''} · {o.city}{o.restaurant ? ` · ${o.restaurant}` : ''}</p>
          </div>
          <ChevronRight size={16} className={cn('shrink-0 text-faint transition-transform', open && 'rotate-90')} />
        </button>
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-ink tabular">{formatPrice(o.total)}</span>
          {next && o.status !== 'cancelled' && (
            <button onClick={() => setStatus(o.id, next)} className="btn inline-flex h-8 items-center gap-1 rounded-lg bg-brand px-2.5 text-xs font-semibold text-brand-fg hover:brightness-110">Mark {next}</button>
          )}
          {o.status !== 'cancelled' && o.status !== 'delivered' && (
            <button onClick={() => setStatus(o.id, 'cancelled')} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-deal hover:bg-deal/10" title="Cancel">✕</button>
          )}
          <button onClick={() => remove(o.id)} className="grid h-8 w-8 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-deal" title="Delete"><Trash2 size={15} /></button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-elevated/40 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-faint">Items</p>
              <ul className="flex flex-col gap-1 text-sm">
                {o.items.map((it, i) => (
                  <li key={i} className="flex justify-between gap-2">
                    <span className="truncate text-muted">{it.name}{it.variant ? ` (${it.variant})` : ''} × {it.qty}</span>
                    <span className="shrink-0 font-semibold text-ink tabular">{formatPrice(it.price * it.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 space-y-1 border-t border-line pt-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Subtotal</span><span className="tabular">{formatPrice(o.subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-muted">Delivery</span><span className="tabular">{o.delivery === 0 ? 'FREE' : formatPrice(o.delivery)}</span></div>
                <div className="flex justify-between font-bold text-ink"><span>Total</span><span className="tabular">{formatPrice(o.total)}</span></div>
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-faint">Customer</p>
              <div className="space-y-1 text-sm text-muted">
                <p className="font-semibold text-ink">{o.name}</p>
                <p className="inline-flex items-center gap-1.5"><Phone size={13} /> {o.phone}</p>
                <p className="inline-flex items-start gap-1.5"><MapPin size={13} className="mt-0.5 shrink-0" /> {o.address}, {o.city}</p>
                <p className="text-xs text-faint">Payment: {o.payment.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
