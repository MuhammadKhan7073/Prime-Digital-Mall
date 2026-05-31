'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UtensilsCrossed, Trash2, ArrowRight, MessageCircle, ArrowLeft } from 'lucide-react'
import { getDish, getRestaurant } from '@/lib/food'
import { formatPrice } from '@/lib/format'
import { waFoodOrder } from '@/lib/wa-verticals'
import { useHydrated } from '@/lib/useHydrated'
import { foodSubtotal, useFoodCart } from '@/store/foodcart'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductImage } from '@/components/ui/ProductImage'
import { QuantityStepper } from '@/components/ui/QuantityStepper'

export default function FoodCartPage() {
  const hydrated = useHydrated()
  const router = useRouter()
  const items = useFoodCart((s) => s.items)
  const restaurant = useFoodCart((s) => s.restaurant)
  const setQty = useFoodCart((s) => s.setQty)
  const remove = useFoodCart((s) => s.remove)
  const subtotal = useFoodCart(foodSubtotal)
  const r = restaurant ? getRestaurant(restaurant) : undefined
  const delivery = r?.deliveryFee ?? 0
  const total = subtotal + (items.length ? delivery : 0)
  const belowMin = r ? subtotal < r.minOrder : false

  if (hydrated && items.length === 0) {
    return (
      <div className="container-app">
        <Breadcrumbs items={[{ label: 'Food', href: '/food' }, { label: 'Order' }]} />
        <div className="card mx-auto flex max-w-md flex-col items-center gap-3 p-12 text-center">
          <span className="text-5xl">🍽️</span>
          <p className="text-lg font-bold text-ink">Your food cart is empty</p>
          <p className="text-sm text-muted">Pick a restaurant and add some dishes.</p>
          <Link href="/food" className="btn-primary btn-lg mt-2" style={{ backgroundColor: 'rgb(var(--accent))' }}>Browse restaurants</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-app">
      <Breadcrumbs items={[{ label: 'Food', href: '/food' }, { label: 'Your order' }]} />
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl text-white" style={{ backgroundImage: 'linear-gradient(135deg,#c2410c,#f59e0b)' }}><UtensilsCrossed size={20} /></span>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Your order</h1>
          {r && <Link href={`/food/${r.slug}`} className="text-sm text-muted hover:text-brand">from {r.name}</Link>}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-3">
          {hydrated && items.map((line) => {
            const d = getDish(line.slug)
            if (!d) return null
            return (
              <div key={line.slug} className="card flex gap-3 p-3">
                <ProductImage from={d.from} to={d.to} emoji={d.emoji} className="h-20 w-20 rounded-xl" emojiClassName="text-3xl" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="font-semibold text-ink">{d.name}</p>
                  <span className="mt-0.5 font-bold text-ink tabular">{formatPrice(d.price)}</span>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <QuantityStepper value={line.qty} onChange={(n) => setQty(line.slug, n)} />
                    <button onClick={() => remove(line.slug)} className="grid h-9 w-9 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-deal"><Trash2 size={17} /></button>
                  </div>
                </div>
              </div>
            )
          })}
          <Link href={r ? `/food/${r.slug}` : '/food'} className="inline-flex w-fit items-center gap-1 text-sm font-medium text-muted hover:text-brand"><ArrowLeft size={15} /> Add more items</Link>
        </div>

        <aside className="h-fit lg:sticky lg:top-32">
          <div className="card flex flex-col gap-3 p-5">
            <h2 className="font-bold text-ink">Bill summary</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="font-semibold text-ink tabular">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd className="font-semibold tabular">{delivery === 0 ? <span className="text-success">FREE</span> : formatPrice(delivery)}</dd></div>
              <div className="flex justify-between border-t border-line pt-2 text-base"><dt className="font-bold text-ink">Total</dt><dd className="font-extrabold text-ink tabular">{formatPrice(total)}</dd></div>
            </dl>
            {belowMin && r && <p className="rounded-lg bg-warn/10 px-3 py-2 text-xs font-medium text-warn">Add {formatPrice(r.minOrder - subtotal)} more to reach the {formatPrice(r.minOrder)} minimum.</p>}
            <button onClick={() => router.push('/foodcheckout')} disabled={belowMin} className="btn-primary btn-lg w-full" style={{ backgroundColor: 'rgb(var(--accent))' }}>
              Checkout <ArrowRight size={18} />
            </button>
            {r && (
              <a href={waFoodOrder(r, items.map((l) => { const d = getDish(l.slug); return { name: d?.name ?? l.slug, qty: l.qty, price: d?.price ?? 0 } }), total)} target="_blank" rel="noreferrer" className="btn-wa btn-md w-full">
                <MessageCircle size={17} /> Order on WhatsApp
              </a>
            )}
            <p className="text-center text-xs text-faint">Cash on delivery available</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
