'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Store, Lock, Check, Plus, X, BookOpen, Award, Sparkles, ScrollText, ExternalLink, Save, Eye } from 'lucide-react'
import { cn } from '@/lib/cn'
import { allShops } from '@/lib/catalog'
import type { ShopAbout } from '@/data/types'
import { useSellerProfiles } from '@/store/sellerProfiles'
import { useUI } from '@/store/ui'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const SELLER_CODE = process.env.NEXT_PUBLIC_SELLER_CODE || 'prime-seller'

export function SellerPortal() {
  const toast = useUI((s) => s.toast)
  const saved = useSellerProfiles((s) => s.about)
  const setAbout = useSellerProfiles((s) => s.setAbout)

  const [shopSlug, setShopSlug] = useState('')
  const [code, setCode] = useState('')
  const [claimed, setClaimed] = useState<string | null>(null)

  const shop = allShops.find((s) => s.slug === claimed)

  // editable fields
  const init = (slug: string): ShopAbout => saved[slug] ?? allShops.find((s) => s.slug === slug)?.about ?? {}
  const [story, setStory] = useState('')
  const [established, setEstablished] = useState('')
  const [certs, setCerts] = useState<string[]>([])
  const [highlights, setHighlights] = useState<string[]>([])
  const [policies, setPolicies] = useState<{ label: string; value: string }[]>([])

  const claim = () => {
    if (!shopSlug || code !== SELLER_CODE) return
    const a = init(shopSlug)
    setStory(a.story ?? '')
    setEstablished(a.established ?? '')
    setCerts(a.certifications ?? [])
    setHighlights(a.highlights ?? [])
    setPolicies(a.policies ?? [])
    setClaimed(shopSlug)
  }

  const save = () => {
    if (!claimed) return
    setAbout(claimed, {
      story: story.trim() || undefined,
      established: established.trim() || undefined,
      certifications: certs.filter(Boolean),
      highlights: highlights.filter(Boolean),
      policies: policies.filter((p) => p.label.trim() && p.value.trim()),
    })
    toast('Shop profile saved ✓', { kind: 'success', href: `/shop/${claimed}`, hrefLabel: 'View shop' })
  }

  if (!claimed || !shop) {
    return (
      <div className="container-app max-w-md">
        <Breadcrumbs items={[{ label: 'Seller Portal' }]} />
        <div className="card mt-2 p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-brand-fg"><Store size={18} /></span>
            <div>
              <h1 className="font-display text-lg font-bold text-ink">Seller Portal</h1>
              <p className="text-xs text-muted">Manage your shop’s story & details</p>
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); claim() }} className="flex flex-col gap-3">
            <div>
              <p className="mb-1.5 text-xs font-semibold text-muted">Your shop</p>
              <select value={shopSlug} onChange={(e) => setShopSlug(e.target.value)} className={cn('input', !shopSlug && 'text-faint')}>
                <option value="">Select your shop</option>
                {allShops.map((s) => <option key={s.slug} value={s.slug} className="text-ink">{s.emoji} {s.name}</option>)}
              </select>
            </div>
            <div>
              <p className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-muted"><Lock size={12} /> Seller passcode</p>
              <input type="password" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Passcode" className="input" />
            </div>
            <button type="submit" disabled={!shopSlug || !code} className="btn-primary btn-lg w-full">Open my shop</button>
            {code && code !== SELLER_CODE && <p className="text-center text-xs text-deal">Wrong passcode.</p>}
          </form>
          <p className="mt-3 text-center text-[11px] text-faint">Demo gate — any shop, passcode <code className="rounded bg-elevated px-1">prime-seller</code>. Real mode: Supabase auth, sellers edit only their own shop.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-app max-w-2xl">
      <Breadcrumbs items={[{ label: 'Seller Portal', href: '/seller' }, { label: shop.name }]} />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl text-white" style={{ backgroundImage: `linear-gradient(135deg, ${shop.from}, ${shop.to})` }}>{shop.emoji}</span>
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">{shop.name}</h1>
            <p className="text-xs text-muted">Editing your shop story (Layer 2 — optional depth)</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/shop/${shop.slug}`} target="_blank" className="btn-ghost btn-sm"><Eye size={14} /> View</Link>
          <button onClick={() => setClaimed(null)} className="btn-ghost btn-sm">Switch shop</button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Field icon={<BookOpen size={14} />} label="Your story" hint="Tell customers who you are and why they should trust you.">
          <textarea value={story} onChange={(e) => setStory(e.target.value)} rows={4} placeholder="We started in…" className="input h-auto resize-none py-2.5" />
        </Field>

        <Field icon={<ScrollText size={14} />} label="Established">
          <input value={established} onChange={(e) => setEstablished(e.target.value)} placeholder="e.g. 2019" className="input" />
        </Field>

        <ListField icon={<Sparkles size={14} />} label="Highlights" items={highlights} setItems={setHighlights} placeholder="e.g. 10,000+ happy customers" />
        <ListField icon={<Award size={14} />} label="Certifications" items={certs} setItems={setCerts} placeholder="e.g. Registered business" />

        <Field icon={<ScrollText size={14} />} label="Policies" hint="Returns, warranty, delivery, etc.">
          <div className="flex flex-col gap-2">
            {policies.map((p, i) => (
              <div key={i} className="flex gap-2">
                <input value={p.label} onChange={(e) => setPolicies((ps) => ps.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} placeholder="Label" className="input w-32 shrink-0" />
                <input value={p.value} onChange={(e) => setPolicies((ps) => ps.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} placeholder="Detail" className="input flex-1" />
                <button onClick={() => setPolicies((ps) => ps.filter((_, j) => j !== i))} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-faint hover:text-deal"><X size={16} /></button>
              </div>
            ))}
            <button onClick={() => setPolicies((ps) => [...ps, { label: '', value: '' }])} className="btn-ghost btn-sm self-start"><Plus size={14} /> Add policy</button>
          </div>
        </Field>

        <button onClick={save} className="btn-primary btn-lg w-full"><Save size={18} /> Save shop profile</button>
        <p className="text-center text-[11px] text-faint">Saved to this browser (demo). Appears in the “About” panel on your shop page — the quiet, explore-if-you-want section. Doesn’t change your buy buttons.</p>
      </div>
    </div>
  )
}

function Field({ icon, label, hint, children }: { icon: React.ReactNode; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="card p-4">
      <p className="mb-1 flex items-center gap-1.5 text-sm font-bold text-ink">{icon} {label}</p>
      {hint && <p className="mb-2 text-xs text-muted">{hint}</p>}
      {children}
    </div>
  )
}

function ListField({ icon, label, items, setItems, placeholder }: { icon: React.ReactNode; label: string; items: string[]; setItems: (v: string[]) => void; placeholder: string }) {
  return (
    <div className="card p-4">
      <p className="mb-2 flex items-center gap-1.5 text-sm font-bold text-ink">{icon} {label}</p>
      <div className="flex flex-col gap-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2">
            <input value={it} onChange={(e) => setItems(items.map((x, j) => j === i ? e.target.value : x))} placeholder={placeholder} className="input flex-1" />
            <button onClick={() => setItems(items.filter((_, j) => j !== i))} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-faint hover:text-deal"><X size={16} /></button>
          </div>
        ))}
        <button onClick={() => setItems([...items, ''])} className="btn-ghost btn-sm self-start"><Plus size={14} /> Add</button>
      </div>
    </div>
  )
}
