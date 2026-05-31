'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Lock, Banknote, Smartphone, Check, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/cn'
import { PAYMENT } from '@/data/catalog'
import { allCities, getCity } from '@/lib/catalog'
import { getDish, getRestaurant } from '@/lib/food'
import { formatPrice } from '@/lib/format'
import { waFoodOrder } from '@/lib/wa-verticals'
import { useHydrated } from '@/lib/useHydrated'
import { foodSubtotal, useFoodCart } from '@/store/foodcart'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export default function FoodCheckout() {
  const hydrated = useHydrated()
  const router = useRouter()
  const items = useFoodCart((s) => s.items)
  const restaurant = useFoodCart((s) => s.restaurant)
  const subtotal = useFoodCart(foodSubtotal)
  const clear = useFoodCart((s) => s.clear)
  const r = restaurant ? getRestaurant(restaurant) : undefined
  const delivery = r?.deliveryFee ?? 0
  const total = subtotal + (items.length ? delivery : 0)

  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '' })
  const [pay, setPay] = useState<'cod' | 'easypaisa'>('cod')
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const valid = form.name.trim() && form.phone.trim().length >= 10 && form.address.trim() && form.city

  const place = () => {
    if (!valid) return
    const ref = 'PDF-' + Math.floor(100000 + Math.random() * 900000)
    clear()
    router.push(`/checkout/success?ref=${ref}`)
  }

  if (hydrated && items.length === 0) {
    return (
      <div className="container-app">
        <Breadcrumbs items={[{ label: 'Food', href: '/food' }, { label: 'Checkout' }]} />
        <div className="card mx-auto flex max-w-md flex-col items-center gap-3 p-12 text-center">
          <span className="text-5xl">🍽️</span><p className="text-lg font-bold text-ink">Nothing to checkout</p>
          <Link href="/food" className="btn-primary btn-lg mt-2" style={{ backgroundColor: 'rgb(var(--accent))' }}>Browse food</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-app">
      <Breadcrumbs items={[{ label: 'Food', href: '/food' }, { label: 'Order', href: '/foodcart' }, { label: 'Checkout' }]} />
      <h1 className="mb-5 flex items-center gap-2 font-display text-2xl font-bold text-ink"><Lock size={20} className="text-brand" /> Food Checkout</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-5">
          <section className="card p-5">
            <h2 className="mb-3 font-bold text-ink">Delivery details</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <input value={form.name} onChange={set('name')} placeholder="Full name" className="input" />
              <input value={form.phone} onChange={set('phone')} placeholder="Phone (03xx xxxxxxx)" inputMode="tel" className="input" />
              <input value={form.address} onChange={set('address')} placeholder="Street address, area" className="input" />
              <select value={form.city} onChange={set('city')} className={cn('input', !form.city && 'text-faint')}>
                <option value="">Select city</option>
                {allCities.map((c) => <option key={c.slug} value={c.slug} className="text-ink">{c.name}</option>)}
              </select>
            </div>
          </section>
          <section className="card p-5">
            <h2 className="mb-3 font-bold text-ink">Payment</h2>
            <div className="flex flex-col gap-2">
              <button onClick={() => setPay('cod')} className={cn('flex items-center gap-3 rounded-xl border p-3 text-left', pay === 'cod' ? 'border-brand bg-brand-soft' : 'border-line')}>
                <span className={cn('grid h-9 w-9 place-items-center rounded-lg', pay === 'cod' ? 'bg-brand text-brand-fg' : 'bg-elevated text-muted')}><Banknote size={18} /></span>
                <span className="flex-1"><span className="block text-sm font-semibold text-ink">Cash on Delivery</span><span className="block text-xs text-muted">Pay the rider when food arrives</span></span>
              </button>
              <button onClick={() => setPay('easypaisa')} className={cn('flex items-center gap-3 rounded-xl border p-3 text-left', pay === 'easypaisa' ? 'border-brand bg-brand-soft' : 'border-line')}>
                <span className={cn('grid h-9 w-9 place-items-center rounded-lg', pay === 'easypaisa' ? 'bg-brand text-brand-fg' : 'bg-elevated text-muted')}><Smartphone size={18} /></span>
                <span className="flex-1"><span className="block text-sm font-semibold text-ink">Easypaisa</span><span className="block text-xs text-muted">{PAYMENT.easypaisa.number}</span></span>
              </button>
            </div>
          </section>
        </div>

        <aside className="h-fit lg:sticky lg:top-32">
          <div className="card flex flex-col gap-3 p-5">
            <h2 className="font-bold text-ink">Order summary</h2>
            <ul className="max-h-56 space-y-2 overflow-y-auto text-sm">
              {hydrated && items.map((l) => { const d = getDish(l.slug); if (!d) return null; return (
                <li key={l.slug} className="flex justify-between gap-2"><span className="truncate text-muted">{d.name} × {l.qty}</span><span className="font-semibold text-ink tabular">{formatPrice(d.price * l.qty)}</span></li>
              )})}
            </ul>
            <dl className="space-y-2 border-t border-line pt-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="font-semibold text-ink tabular">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd className="font-semibold tabular">{delivery === 0 ? <span className="text-success">FREE</span> : formatPrice(delivery)}</dd></div>
              <div className="flex justify-between border-t border-line pt-2 text-base"><dt className="font-bold text-ink">Total</dt><dd className="font-extrabold text-ink tabular">{formatPrice(total)}</dd></div>
            </dl>
            <button onClick={place} disabled={!valid} className="btn-primary btn-lg w-full" style={{ backgroundColor: 'rgb(var(--accent))' }}><Check size={18} /> Place order</button>
            {!valid && <p className="text-center text-xs text-faint">Fill all details to continue</p>}
            {r && <a href={waFoodOrder(r, items.map((l) => { const d = getDish(l.slug); return { name: d?.name ?? l.slug, qty: l.qty, price: d?.price ?? 0 } }), total)} target="_blank" rel="noreferrer" className="btn-wa btn-md w-full"><MessageCircle size={17} /> Order on WhatsApp</a>}
          </div>
        </aside>
      </div>
    </div>
  )
}
