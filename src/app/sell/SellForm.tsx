'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Store, UtensilsCrossed, Stethoscope, Wrench, ArrowRight, ArrowLeft, Check, MessageCircle, Loader2, BadgeCheck, TrendingUp, Wallet } from 'lucide-react'
import { cn } from '@/lib/cn'
import { allCities } from '@/lib/catalog'
import { allServiceCategories } from '@/lib/services'
import { allCategories } from '@/lib/catalog'
import { cuisines } from '@/data/food'
import { specialties } from '@/data/health'
import { waTeam } from '@/lib/whatsapp'
import { backendMode, submitBusinessRemote } from '@/lib/backend'
import { useSubmissions } from '@/store/submissions'
import { useUI } from '@/store/ui'
import { Breadcrumbs } from '@/components/Breadcrumbs'

type Vertical = 'shop' | 'food' | 'health' | 'services'

const VERTICALS: { key: Vertical; label: string; icon: typeof Store; from: string; to: string; noun: string }[] = [
  { key: 'shop', label: 'A Shop', icon: Store, from: '#0f6350', to: '#34c7a1', noun: 'products' },
  { key: 'food', label: 'A Restaurant', icon: UtensilsCrossed, from: '#c2410c', to: '#f59e0b', noun: 'food' },
  { key: 'health', label: 'A Clinic / Doctor', icon: Stethoscope, from: '#0369a1', to: '#22d3ee', noun: 'health services' },
  { key: 'services', label: 'A Service', icon: Wrench, from: '#6d28d9', to: '#a855f7', noun: 'services' },
]

function categoriesFor(v: Vertical): { slug: string; name: string }[] {
  if (v === 'shop') return allCategories.map((c) => ({ slug: c.slug, name: c.name }))
  if (v === 'food') return cuisines.map((c) => ({ slug: c.slug, name: c.name }))
  if (v === 'health') return specialties.map((s) => ({ slug: s.slug, name: s.name }))
  return allServiceCategories.map((c) => ({ slug: c.slug, name: c.name }))
}

export function SellForm() {
  const toast = useUI((s) => s.toast)
  const addLocal = useSubmissions((s) => s.add)

  const [step, setStep] = useState(0)
  const [vertical, setVertical] = useState<Vertical | null>(null)
  const [form, setForm] = useState({
    category: '', businessName: '', ownerName: '', city: '', phone: '', whatsapp: '', description: '', address: '', delivery: 'pakistan',
  })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState<string | null>(null)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const step1Valid = !!vertical && !!form.category
  const step2Valid = form.businessName.trim() && form.ownerName.trim() && form.city && form.phone.trim().length >= 10
  const valid = step1Valid && step2Valid && form.description.trim().length > 5

  const submit = async () => {
    if (!valid || !vertical) return
    setSubmitting(true)
    const payload = {
      vertical,
      category: form.category,
      businessName: form.businessName.trim(),
      ownerName: form.ownerName.trim(),
      city: form.city,
      phone: form.phone.trim(),
      whatsapp: (form.whatsapp || form.phone).trim(),
      description: form.description.trim(),
      address: form.address.trim() || undefined,
      delivery: form.delivery,
    }
    let id = ''
    try {
      if (backendMode === 'supabase') {
        id = await submitBusinessRemote(payload)
      } else {
        id = addLocal(payload)
      }
      setDone(id)
      toast('Business submitted for review ✓', { kind: 'success' })
    } catch {
      // Fallback to local queue if remote write fails.
      id = addLocal(payload)
      setDone(id)
      toast('Saved locally — also send us the details on WhatsApp', { kind: 'info' })
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    const waMsg = `Assalam o Alaikum! I want to list my business on Prime Digital Mall.\n\nRef: ${done}\nBusiness: ${form.businessName}\nType: ${vertical}\nCategory: ${form.category}\nCity: ${form.city}\nPhone: ${form.phone}\n\n${form.description}`
    return (
      <div className="container-app max-w-2xl">
        <Breadcrumbs items={[{ label: 'Sell' }]} />
        <div className="card flex flex-col items-center gap-3 p-8 text-center animate-scale-in">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success"><Check size={34} /></span>
          <h1 className="font-display text-2xl font-bold text-ink">Submitted for review!</h1>
          <p className="max-w-md text-sm text-muted">
            Thanks, <span className="font-semibold text-ink">{form.businessName}</span>. Our team will verify your details and get you listed. You’ll be contacted on your number.
          </p>
          <div className="my-2 w-full max-w-xs rounded-xl border border-line bg-elevated p-4">
            <p className="text-xs text-muted">Your reference</p>
            <p className="text-lg font-extrabold tracking-wider text-ink">{done}</p>
          </div>
          <a href={waTeam(waMsg)} target="_blank" rel="noreferrer" className="btn-wa btn-lg w-full max-w-xs">
            <MessageCircle size={18} /> Speed it up on WhatsApp
          </a>
          <Link href="/" className="text-sm font-medium text-muted hover:text-brand">Back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-app max-w-2xl">
      <Breadcrumbs items={[{ label: 'Sell' }]} />

      {/* hero */}
      <div className="mb-6">
        <span className="rule-accent mb-3 block" />
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">Sell on Prime Digital Mall</h1>
        <p className="mt-1 text-muted">Reach customers across Pakistan. Free to start — list in 2 minutes.</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { icon: TrendingUp, t: 'More customers', s: 'City + nationwide reach' },
            { icon: Wallet, t: 'Low cost', s: 'From Rs 100 / month' },
            { icon: BadgeCheck, t: 'Verified badge', s: 'Build buyer trust' },
          ].map((b) => (
            <div key={b.t} className="rounded-xl border border-line bg-surface p-3 text-center">
              <b.icon size={18} className="mx-auto text-brand" />
              <p className="mt-1 text-xs font-bold text-ink">{b.t}</p>
              <p className="text-[11px] text-faint">{b.s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* step indicator */}
      <div className="mb-4 flex items-center gap-2">
        {[0, 1].map((i) => (
          <div key={i} className={cn('h-1.5 flex-1 rounded-full', step >= i ? 'bg-brand' : 'bg-line')} />
        ))}
      </div>

      {step === 0 && (
        <div className="card flex flex-col gap-4 p-5">
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">What are you listing?</p>
            <div className="grid grid-cols-2 gap-2">
              {VERTICALS.map((v) => {
                const on = vertical === v.key
                return (
                  <button key={v.key} onClick={() => { setVertical(v.key); setForm((f) => ({ ...f, category: '' })) }}
                    className={cn('flex items-center gap-3 rounded-xl border p-3 text-left transition-all', on ? 'border-brand bg-brand-soft' : 'border-line hover:border-faint')}>
                    <span className="grid h-9 w-9 place-items-center rounded-lg text-white" style={{ backgroundImage: `linear-gradient(135deg, ${v.from}, ${v.to})` }}><v.icon size={18} /></span>
                    <span className={cn('text-sm font-semibold', on ? 'text-brand' : 'text-ink')}>{v.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {vertical && (
            <div>
              <p className="mb-1.5 text-sm font-semibold text-ink">Category</p>
              <select value={form.category} onChange={set('category')} className={cn('input', !form.category && 'text-faint')}>
                <option value="">Select a category</option>
                {categoriesFor(vertical).map((c) => <option key={c.slug} value={c.name} className="text-ink">{c.name}</option>)}
              </select>
            </div>
          )}

          <button onClick={() => setStep(1)} disabled={!step1Valid} className="btn-primary btn-lg w-full">
            Continue <ArrowRight size={18} />
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="card flex flex-col gap-3 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <input value={form.businessName} onChange={set('businessName')} placeholder="Business name" className="input" />
            <input value={form.ownerName} onChange={set('ownerName')} placeholder="Your name" className="input" />
            <input value={form.phone} onChange={set('phone')} placeholder="Phone (03xx xxxxxxx)" inputMode="tel" className="input" />
            <input value={form.whatsapp} onChange={set('whatsapp')} placeholder="WhatsApp (if different)" inputMode="tel" className="input" />
            <select value={form.city} onChange={set('city')} className={cn('input', !form.city && 'text-faint')}>
              <option value="">Select city</option>
              {allCities.map((c) => <option key={c.slug} value={c.name} className="text-ink">{c.name}</option>)}
            </select>
            {(vertical === 'shop' || vertical === 'food') && (
              <select value={form.delivery} onChange={set('delivery')} className="input">
                <option value="pakistan">Delivers all Pakistan</option>
                <option value="city">Delivers in my city</option>
                <option value="none">Pickup only</option>
              </select>
            )}
          </div>
          <input value={form.address} onChange={set('address')} placeholder="Address / area (optional)" className="input" />
          <textarea value={form.description} onChange={set('description')} rows={3} placeholder="Tell customers what you offer…" className="input h-auto resize-none py-2.5" />

          <div className="flex gap-2">
            <button onClick={() => setStep(0)} className="btn-ghost btn-lg"><ArrowLeft size={18} /> Back</button>
            <button onClick={submit} disabled={!valid || submitting} className="btn-primary btn-lg flex-1">
              {submitting ? <><Loader2 size={18} className="animate-spin" /> Submitting…</> : <><Check size={18} /> Submit for review</>}
            </button>
          </div>
          {!valid && <p className="text-center text-xs text-faint">Fill business name, your name, phone, city & a short description.</p>}
          <p className="text-center text-[11px] text-faint">
            {backendMode === 'supabase' ? 'Saved to our system for review.' : 'Demo mode — saved on this device. Connect Supabase for live multi-user (see BACKEND.md).'}
          </p>
        </div>
      )}
    </div>
  )
}
