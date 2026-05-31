'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Truck, Banknote, Smartphone, Building2, ShieldCheck, Lock, MessageCircle, Check } from 'lucide-react'
import { PAYMENT } from '@/data/catalog'
import { FREE_SHIP_THRESHOLD, allCities, getProduct } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'
import { variantSummary } from '@/lib/variant'
import { waCartOrder } from '@/lib/whatsapp'
import { useHydrated } from '@/lib/useHydrated'
import { cartSubtotal, lineUnitPrice, useCart } from '@/store/cart'
import { useOrders } from '@/store/orders'
import { cn } from '@/lib/cn'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductImage } from '@/components/ui/ProductImage'

const DELIVERY_FLAT = 199
type Pay = 'cod' | 'easypaisa' | 'bank'

export default function CheckoutPage() {
  const hydrated = useHydrated()
  const router = useRouter()
  const items = useCart((s) => s.items)
  const subtotal = useCart(cartSubtotal)
  const clear = useCart((s) => s.clear)
  const placeOrderRecord = useOrders((s) => s.place)

  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', notes: '' })
  const [pay, setPay] = useState<Pay>('cod')
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const delivery = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FLAT
  const total = subtotal + delivery
  const valid = form.name.trim() && form.phone.trim().length >= 10 && form.address.trim() && form.city

  const placeOrder = () => {
    if (!valid) return
    const ref = 'PDM-' + Math.floor(100000 + Math.random() * 900000)
    placeOrderRecord({
      ref,
      kind: 'shop',
      items: items.map((l) => { const p = getProduct(l.slug); return { name: p?.name ?? l.slug, qty: l.qty, price: lineUnitPrice(l), variant: variantSummary(l.variant) || undefined } }),
      subtotal, delivery, total,
      name: form.name, phone: form.phone, address: form.address, city: form.city, payment: pay,
    })
    clear()
    router.push(`/checkout/success?ref=${ref}`)
  }

  if (hydrated && items.length === 0) {
    return (
      <div className="container-app">
        <Breadcrumbs items={[{ label: 'Checkout' }]} />
        <div className="card mx-auto flex max-w-md flex-col items-center gap-3 p-12 text-center">
          <span className="text-5xl">🛍️</span>
          <p className="text-lg font-bold text-ink">Nothing to checkout</p>
          <Link href="/" className="btn-primary btn-lg mt-2">Browse products</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-app">
      <Breadcrumbs items={[{ label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="mb-5 flex items-center gap-2 text-2xl font-extrabold tracking-tight text-ink">
        <Lock size={20} className="text-brand" /> Secure Checkout
      </h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* form */}
        <div className="flex flex-col gap-5">
          <section className="card p-5">
            <h2 className="mb-3 font-bold text-ink">Contact & delivery</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <input value={form.name} onChange={set('name')} placeholder="Full name" className="input" />
              <input value={form.phone} onChange={set('phone')} placeholder="Phone (03xx xxxxxxx)" inputMode="tel" className="input" />
              <select value={form.city} onChange={set('city')} className={cn('input', !form.city && 'text-faint')}>
                <option value="">Select city</option>
                {allCities.map((c) => (
                  <option key={c.slug} value={c.slug} className="text-ink">{c.name}</option>
                ))}
              </select>
              <input value={form.address} onChange={set('address')} placeholder="Street address, area" className="input sm:col-span-1" />
              <textarea value={form.notes} onChange={set('notes')} placeholder="Delivery notes (optional)" rows={2} className="input h-auto resize-none py-2.5 sm:col-span-2" />
            </div>
          </section>

          <section className="card p-5">
            <h2 className="mb-3 font-bold text-ink">Payment method</h2>
            <div className="flex flex-col gap-2">
              <PayOption active={pay === 'cod'} onClick={() => setPay('cod')} icon={<Banknote size={18} />} title="Cash on Delivery" desc="Pay when it arrives — most popular" />
              <PayOption active={pay === 'easypaisa'} onClick={() => setPay('easypaisa')} icon={<Smartphone size={18} />} title="Easypaisa" desc="Send payment to our Easypaisa account" />
              <PayOption active={pay === 'bank'} onClick={() => setPay('bank')} icon={<Building2 size={18} />} title="Bank Transfer" desc={PAYMENT.bank.bankName} />
            </div>

            {pay === 'easypaisa' && (
              <div className="mt-3 rounded-xl border border-line bg-elevated p-3 text-sm">
                <p className="font-semibold text-ink">{PAYMENT.easypaisa.name}</p>
                <p className="text-muted">Easypaisa: <span className="font-bold text-ink tabular">{PAYMENT.easypaisa.number}</span></p>
                <p className="mt-1 text-xs text-faint">Send {formatPrice(total)} and share the screenshot on WhatsApp to confirm.</p>
              </div>
            )}
            {pay === 'bank' && (
              <div className="mt-3 space-y-0.5 rounded-xl border border-line bg-elevated p-3 text-sm">
                <p className="font-semibold text-ink">{PAYMENT.bank.accountTitle}</p>
                <p className="text-muted">{PAYMENT.bank.bankName}</p>
                <p className="text-muted">Account: <span className="font-bold text-ink tabular">{PAYMENT.bank.accountNumber}</span></p>
                <p className="text-muted">IBAN: <span className="font-bold text-ink tabular">{PAYMENT.bank.iban}</span></p>
                <p className="mt-1 text-xs text-faint">Transfer {formatPrice(total)} and share the receipt on WhatsApp.</p>
              </div>
            )}
          </section>
        </div>

        {/* summary */}
        <aside className="h-fit lg:sticky lg:top-32">
          <div className="card flex flex-col gap-3 p-5">
            <h2 className="font-bold text-ink">Order summary</h2>
            <ul className="max-h-64 space-y-3 overflow-y-auto">
              {hydrated && items.map((l) => {
                const p = getProduct(l.slug)
                if (!p) return null
                const sum = variantSummary(l.variant)
                return (
                  <li key={l.id} className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <ProductImage from={p.from} to={p.to} emoji={p.emoji} className="h-12 w-12 rounded-lg" emojiClassName="text-xl" />
                      <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-ink px-1 text-[10px] font-bold text-bg">{l.qty}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-medium text-ink">{p.name}</p>
                      {sum && <p className="text-xs text-faint">{sum}</p>}
                    </div>
                    <span className="text-sm font-semibold text-ink tabular">{formatPrice(lineUnitPrice(l) * l.qty)}</span>
                  </li>
                )
              })}
            </ul>
            <dl className="space-y-2 border-t border-line pt-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="font-semibold text-ink tabular">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd className="font-semibold tabular">{delivery === 0 ? <span className="text-success">FREE</span> : formatPrice(delivery)}</dd></div>
              <div className="flex justify-between border-t border-line pt-2 text-base"><dt className="font-bold text-ink">Total</dt><dd className="font-extrabold text-ink tabular">{formatPrice(total)}</dd></div>
            </dl>

            <button onClick={placeOrder} disabled={!valid} className="btn-primary btn-lg w-full">
              <Check size={18} /> Place order
            </button>
            {!valid && <p className="text-center text-xs text-faint">Fill your name, phone, address & city to continue</p>}
            <a
              href={waCartOrder(items.map((l) => { const p = getProduct(l.slug); return { name: p?.name ?? l.slug, qty: l.qty, price: lineUnitPrice(l), variant: variantSummary(l.variant) } }), total)}
              target="_blank"
              rel="noreferrer"
              className="btn-wa btn-md w-full"
            >
              <MessageCircle size={17} /> Order on WhatsApp instead
            </a>

            <div className="flex items-center justify-center gap-3 pt-1 text-xs text-muted">
              <span className="inline-flex items-center gap-1"><ShieldCheck size={13} className="text-success" /> Buyer protection</span>
              <span className="inline-flex items-center gap-1"><Truck size={13} className="text-brand" /> Fast delivery</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function PayOption({ active, onClick, icon, title, desc }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <button onClick={onClick} className={cn('flex items-center gap-3 rounded-xl border p-3 text-left transition-colors', active ? 'border-brand bg-brand-soft' : 'border-line hover:border-faint')}>
      <span className={cn('grid h-9 w-9 place-items-center rounded-lg', active ? 'bg-brand text-brand-fg' : 'bg-elevated text-muted')}>{icon}</span>
      <span className="flex-1">
        <span className="block text-sm font-semibold text-ink">{title}</span>
        <span className="block text-xs text-muted">{desc}</span>
      </span>
      <span className={cn('grid h-5 w-5 place-items-center rounded-full border-2', active ? 'border-brand' : 'border-line')}>
        {active && <span className="h-2.5 w-2.5 rounded-full bg-brand" />}
      </span>
    </button>
  )
}
