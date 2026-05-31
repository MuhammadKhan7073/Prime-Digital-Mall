'use client'

import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { cn } from '@/lib/cn'
import { allCities } from '@/lib/catalog'
import { useAdminOverrides } from '@/store/adminOverrides'
import { useUI } from '@/store/ui'

type Vertical = 'shop' | 'food' | 'health' | 'services'

const NOUN: Record<Vertical, { biz: string; listing: string }> = {
  shop: { biz: 'Shop', listing: 'Product' },
  food: { biz: 'Restaurant', listing: 'Dish' },
  health: { biz: 'Clinic', listing: 'Doctor' },
  services: { biz: 'Provider', listing: 'Service' },
}
const EMOJI = ['🛍️', '🍔', '🩺', '🔧', '🏬', '🍕', '💊', '🧹', '📱', '👗', '🥭', '💄', '🚗', '📦', '☕', '🎁']

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item-' + Math.floor(Math.random() * 9999)
}

export function AddEntityModal({ kind, onClose }: { kind: 'business' | 'listing'; onClose: () => void }) {
  const addCustom = useAdminOverrides((s) => s.addCustom)
  const toast = useUI((s) => s.toast)
  const [vertical, setVertical] = useState<Vertical>('shop')
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [price, setPrice] = useState('')
  const [sub, setSub] = useState('')
  const [emoji, setEmoji] = useState('🛍️')

  const valid = name.trim() && (kind === 'business' ? city : price)

  const submit = () => {
    if (!valid) return
    const slug = slugify(name) + '-' + Math.floor(Math.random() * 999)
    addCustom({
      key: `${vertical}:${kind}:${slug}`,
      kind,
      vertical,
      name: name.trim(),
      emoji,
      from: '#0f6350',
      to: '#34c7a1',
      city: city || undefined,
      price: price ? Number(price) : undefined,
      sub: sub || (kind === 'listing' ? NOUN[vertical].biz : undefined),
    })
    toast(`${kind === 'business' ? NOUN[vertical].biz : NOUN[vertical].listing} added`, { kind: 'success' })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button aria-label="Close" className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-pop animate-scale-in">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="font-bold text-ink">Add {kind === 'business' ? 'a business' : 'a listing'}</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-ink"><X size={16} /></button>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div>
            <p className="mb-1.5 text-xs font-semibold text-muted">Vertical</p>
            <div className="grid grid-cols-4 gap-1.5">
              {(['shop', 'food', 'health', 'services'] as Vertical[]).map((v) => (
                <button key={v} onClick={() => setVertical(v)} className={cn('rounded-lg border py-2 text-xs font-semibold capitalize', vertical === v ? 'border-brand bg-brand-soft text-brand' : 'border-line text-muted')}>{v}</button>
              ))}
            </div>
          </div>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={`${kind === 'business' ? NOUN[vertical].biz : NOUN[vertical].listing} name`} className="input" autoFocus />
          {kind === 'business' ? (
            <select value={city} onChange={(e) => setCity(e.target.value)} className={cn('input', !city && 'text-faint')}>
              <option value="">Select city</option>
              {allCities.map((c) => <option key={c.slug} value={c.name} className="text-ink">{c.name}</option>)}
            </select>
          ) : (
            <>
              <input value={price} onChange={(e) => setPrice(e.target.value.replace(/\D/g, ''))} placeholder="Price (Rs)" inputMode="numeric" className="input" />
              <input value={sub} onChange={(e) => setSub(e.target.value)} placeholder="Business / subtitle (optional)" className="input" />
            </>
          )}
          <div>
            <p className="mb-1.5 text-xs font-semibold text-muted">Icon</p>
            <div className="flex flex-wrap gap-1.5">
              {EMOJI.map((e) => (
                <button key={e} onClick={() => setEmoji(e)} className={cn('grid h-9 w-9 place-items-center rounded-lg border text-lg', emoji === e ? 'border-brand bg-brand-soft' : 'border-line')}>{e}</button>
              ))}
            </div>
          </div>
          <button onClick={submit} disabled={!valid} className="btn-primary btn-lg w-full"><Plus size={18} /> Add</button>
          <p className="text-center text-[11px] text-faint">Demo mode — added to this browser. In real mode this writes to Supabase.</p>
        </div>
      </div>
    </div>
  )
}
