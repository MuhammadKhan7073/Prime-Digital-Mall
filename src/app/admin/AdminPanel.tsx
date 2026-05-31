'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Lock, ShieldCheck, Check, X, Trash2, Store, UtensilsCrossed, Stethoscope, Wrench,
  RefreshCw, Database, HardDrive, Search, LayoutDashboard, ClipboardList, Building2,
  Package, Plus, ScrollText, ChevronRight, Pencil,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { useHydrated } from '@/lib/useHydrated'
import { backendMode, fetchSubmissionsRemote, setStatusRemote } from '@/lib/backend'
import { useSubmissions, type BusinessSubmission, type SubmissionStatus } from '@/store/submissions'
import { adminBusinesses, adminListings } from '@/lib/adminDirectory'
import { useAdminOverrides } from '@/store/adminOverrides'
import { EntityActions, EntityBadges } from './EntityActions'
import { AddEntityModal } from './AddEntityModal'
import { BulkBar } from './BulkBar'

const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_CODE || 'prime-admin'
const VICON: Record<string, typeof Store> = { shop: Store, food: UtensilsCrossed, health: Stethoscope, services: Wrench }
const SUB_STYLE: Record<SubmissionStatus, string> = { pending: 'bg-warn/15 text-warn', approved: 'bg-success/15 text-success', rejected: 'bg-deal/15 text-deal' }

type Tab = 'overview' | 'signups' | 'businesses' | 'listings'
type VFilter = 'all' | 'shop' | 'food' | 'health' | 'services'

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

export function AdminPanel() {
  const hydrated = useHydrated()
  const [authed, setAuthed] = useState(false)
  const [code, setCode] = useState('')
  const [tab, setTab] = useState<Tab>('overview')

  useEffect(() => { if (sessionStorage.getItem('pdm-admin') === '1') setAuthed(true) }, [])

  if (!authed) {
    return (
      <div className="container-app flex min-h-[60vh] items-center justify-center">
        <div className="card w-full max-w-sm p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-brand-fg"><Lock size={18} /></span>
            <div>
              <h1 className="font-display text-lg font-bold text-ink">Admin access</h1>
              <p className="text-xs text-muted">Enter the admin passcode</p>
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (code === ADMIN_CODE) { setAuthed(true); sessionStorage.setItem('pdm-admin', '1') } }}>
            <input type="password" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Passcode" className="input mb-3" autoFocus />
            <button type="submit" className="btn-primary btn-lg w-full">Unlock</button>
          </form>
          {code && code !== ADMIN_CODE && <p className="mt-2 text-center text-xs text-deal">Wrong passcode.</p>}
          <p className="mt-3 text-center text-[11px] text-faint">Demo gate. Production should use Supabase auth + admin role (see BACKEND.md).</p>
        </div>
      </div>
    )
  }

  const TABS: { key: Tab; label: string; icon: typeof Store }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'signups', label: 'Signups', icon: ClipboardList },
    { key: 'businesses', label: 'Businesses', icon: Building2 },
    { key: 'listings', label: 'Listings', icon: Package },
  ]

  return (
    <div className="container-app">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-brand-fg"><ShieldCheck size={20} /></span>
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">Admin Dashboard</h1>
            <p className="flex items-center gap-1.5 text-xs text-muted">
              {backendMode === 'supabase'
                ? <><Database size={12} className="text-success" /> Connected to Supabase (live)</>
                : <><HardDrive size={12} className="text-warn" /> Demo mode — local to this browser</>}
            </p>
          </div>
        </div>
        <button onClick={() => { setAuthed(false); sessionStorage.removeItem('pdm-admin') }} className="btn-ghost btn-sm">Lock</button>
      </div>

      <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-line bg-surface p-1 no-scrollbar">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={cn('inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold', tab === t.key ? 'bg-brand text-brand-fg' : 'text-muted hover:text-ink')}>
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {!hydrated ? <div className="py-20 text-center text-muted">Loading…</div> : (
        <>
          {tab === 'overview' && <OverviewTab onJump={setTab} />}
          {tab === 'signups' && <SignupsTab />}
          {tab === 'businesses' && <BusinessesTab />}
          {tab === 'listings' && <ListingsTab />}
        </>
      )}
    </div>
  )
}

/* ───────────────────────── Overview ───────────────────────── */

function OverviewTab({ onJump }: { onJump: (t: Tab) => void }) {
  const localItems = useSubmissions((s) => s.items)
  const flags = useAdminOverrides((s) => s.flags)
  const custom = useAdminOverrides((s) => s.custom)
  const log = useAdminOverrides((s) => s.log)
  const resetAll = useAdminOverrides((s) => s.resetAll)

  const businesses = useMemo(() => adminBusinesses(), [])
  const listings = useMemo(() => adminListings(), [])
  const flagVals = Object.values(flags)
  const count = (f: string) => flagVals.filter((arr) => (arr as string[]).includes(f)).length

  const cards = [
    { k: 'Businesses', v: businesses.length + custom.filter((c) => c.kind === 'business').length, c: 'text-ink', t: 'businesses' as Tab },
    { k: 'Listings', v: listings.length + custom.filter((c) => c.kind === 'listing').length, c: 'text-ink', t: 'listings' as Tab },
    { k: 'Pending signups', v: localItems.filter((i) => i.status === 'pending').length, c: 'text-warn', t: 'signups' as Tab },
    { k: 'Hidden', v: count('hidden'), c: 'text-faint', t: 'businesses' as Tab },
    { k: 'Frozen', v: count('frozen'), c: 'text-sky-500', t: 'businesses' as Tab },
    { k: 'Featured', v: count('featured'), c: 'text-amber-600', t: 'businesses' as Tab },
    { k: 'Removed', v: count('removed'), c: 'text-deal', t: 'businesses' as Tab },
    { k: 'Admin-added', v: custom.length, c: 'text-brand', t: 'businesses' as Tab },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((s) => (
          <button key={s.k} onClick={() => onJump(s.t)} className="card p-4 text-left transition-shadow hover:shadow-card">
            <p className="text-xs text-muted">{s.k}</p>
            <p className={cn('text-2xl font-extrabold tabular', s.c)}>{s.v}</p>
          </button>
        ))}
      </div>

      <div className="card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-bold text-ink"><ScrollText size={18} className="text-brand" /> Activity log</h2>
          {log.length > 0 && <button onClick={() => { if (confirm('Reset ALL admin changes (flags, custom adds, prices)?')) resetAll() }} className="btn-ghost btn-sm text-deal">Reset all changes</button>}
        </div>
        {log.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted">No actions yet. Hide, freeze, feature, remove or add from the other tabs.</p>
        ) : (
          <ul className="flex flex-col gap-1.5">
            {log.slice(0, 15).map((e) => (
              <li key={e.id} className="flex items-center gap-2 text-sm">
                <span className="rounded-md bg-elevated px-2 py-0.5 text-xs font-semibold text-ink">{e.action}</span>
                <span className="min-w-0 flex-1 truncate text-muted">{e.target}</span>
                <span className="shrink-0 text-xs text-faint">{timeAgo(e.ts)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

/* ───────────────────────── Signups ───────────────────────── */

function SignupsTab() {
  const localItems = useSubmissions((s) => s.items)
  const setLocalStatus = useSubmissions((s) => s.setStatus)
  const removeLocal = useSubmissions((s) => s.remove)
  const [remoteItems, setRemoteItems] = useState<BusinessSubmission[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | SubmissionStatus>('pending')
  const [q, setQ] = useState('')

  const loadRemote = async () => {
    if (backendMode !== 'supabase') return
    setLoading(true)
    try { setRemoteItems(await fetchSubmissionsRemote()) } catch { /* ignore */ } finally { setLoading(false) }
  }
  useEffect(() => { loadRemote() }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const items = backendMode === 'supabase' ? remoteItems : localItems

  const setStatus = async (id: string, status: SubmissionStatus) => {
    if (backendMode === 'supabase') { try { await setStatusRemote(id, status); await loadRemote() } catch { /* ignore */ } }
    else setLocalStatus(id, status)
  }

  const shown = useMemo(() => {
    let list = items
    if (filter !== 'all') list = list.filter((i) => i.status === filter)
    if (q.trim()) { const t = q.toLowerCase(); list = list.filter((i) => `${i.businessName} ${i.ownerName} ${i.city} ${i.category}`.toLowerCase().includes(t)) }
    return list
  }, [items, filter, q])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1 rounded-xl border border-line bg-surface p-1">
          {(['pending', 'approved', 'rejected', 'all'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn('rounded-lg px-3 py-1.5 text-sm font-medium capitalize', filter === f ? 'bg-brand text-brand-fg' : 'text-muted hover:text-ink')}>{f}</button>
          ))}
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-surface px-3">
          <Search size={15} className="text-faint" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search signups…" className="h-9 w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint" />
        </div>
        {backendMode === 'supabase' && <button onClick={loadRemote} className="btn-ghost btn-sm"><RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh</button>}
      </div>

      {shown.length === 0 ? (
        <div className="card flex flex-col items-center gap-2 p-12 text-center">
          <span className="text-4xl">📋</span>
          <p className="font-semibold text-ink">No {filter !== 'all' ? filter : ''} signups</p>
          <p className="text-sm text-muted">Business signups from <code className="rounded bg-elevated px-1">/sell</code> appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {shown.map((b) => {
            const Icon = VICON[b.vertical] ?? Store
            return (
              <div key={b.id} className="card p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-elevated text-muted"><Icon size={18} /></span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-ink">{b.businessName}</h3>
                        <span className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase', SUB_STYLE[b.status])}>{b.status}</span>
                        <span className="rounded-md bg-elevated px-1.5 py-0.5 text-[10px] font-semibold capitalize text-muted">{b.vertical}</span>
                      </div>
                      <p className="text-xs text-muted">{b.category} · {b.city} · {b.ownerName}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-muted">{b.description}</p>
                      <p className="mt-1 text-[11px] text-faint">📞 {b.phone} · WhatsApp {b.whatsapp} · ref {b.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {b.status !== 'approved' && <button onClick={() => setStatus(b.id, 'approved')} className="btn inline-flex h-9 items-center gap-1 rounded-lg bg-success px-3 text-xs font-semibold text-white hover:brightness-110"><Check size={14} /> Approve</button>}
                    {b.status !== 'rejected' && <button onClick={() => setStatus(b.id, 'rejected')} className="btn inline-flex h-9 items-center gap-1 rounded-lg border border-line px-3 text-xs font-semibold text-deal hover:bg-deal/10"><X size={14} /> Reject</button>}
                    {backendMode === 'demo' && <button onClick={() => removeLocal(b.id)} className="grid h-9 w-9 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-deal" title="Delete"><Trash2 size={15} /></button>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ───────────────────────── Businesses ───────────────────────── */

function BusinessesTab() {
  const custom = useAdminOverrides((s) => s.custom)
  const removeCustom = useAdminOverrides((s) => s.removeCustom)
  const [q, setQ] = useState('')
  const [vf, setVf] = useState<VFilter>('all')
  const [openBiz, setOpenBiz] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [sel, setSel] = useState<Set<string>>(new Set())
  const toggleSel = (k: string) => setSel((s) => { const n = new Set(s); n.has(k) ? n.delete(k) : n.add(k); return n })

  const seed = useMemo(() => adminBusinesses(), [])
  const customBiz = custom.filter((c) => c.kind === 'business')
  const listings = useMemo(() => adminListings(), [])

  const all = [
    ...seed.map((b) => ({ ...b, custom: false })),
    ...customBiz.map((c) => ({ key: c.key, vertical: c.vertical, slug: c.key, name: c.name, emoji: c.emoji, from: c.from, to: c.to, city: c.city ?? '', rating: 0, verified: false, href: '#', listingCount: 0, custom: true })),
  ]

  const shown = all.filter((b) => (vf === 'all' || b.vertical === vf) && (!q.trim() || `${b.name} ${b.city}`.toLowerCase().includes(q.toLowerCase())))
  const visKeys = shown.filter((b) => !b.custom).map((b) => b.key)
  const allSel = visKeys.length > 0 && visKeys.every((k) => sel.has(k))

  return (
    <div className="flex flex-col gap-4">
      <Toolbar q={q} setQ={setQ} vf={vf} setVf={setVf} onAdd={() => setAdding(true)} addLabel="Add business" />
      {visKeys.length > 0 && (
        <button onClick={() => setSel(allSel ? new Set() : new Set(visKeys))} className="self-end text-xs font-semibold text-brand hover:underline">
          {allSel ? 'Deselect all' : 'Select all'}
        </button>
      )}
      <div className="flex flex-col gap-2">
        {shown.map((b) => {
          const Icon = VICON[b.vertical] ?? Store
          const bizListings = listings.filter((l) => l.businessKey === b.key)
          return (
            <div key={b.key} className={cn('card overflow-hidden', sel.has(b.key) && 'ring-2 ring-brand')}>
              <div className="flex flex-wrap items-center justify-between gap-3 p-3">
                <div className="flex min-w-0 items-center gap-3">
                  {!b.custom && <input type="checkbox" checked={sel.has(b.key)} onChange={() => toggleSel(b.key)} className="h-4 w-4 shrink-0 accent-[rgb(var(--brand))]" aria-label="Select" />}
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white" style={{ backgroundImage: `linear-gradient(135deg, ${b.from}, ${b.to})` }}>{b.emoji}</span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-bold text-ink">{b.name}</h3>
                      <span className="inline-flex items-center gap-1 rounded-md bg-elevated px-1.5 py-0.5 text-[10px] font-semibold capitalize text-muted"><Icon size={10} /> {b.vertical}</span>
                      {b.custom && <span className="rounded-md bg-brand-soft px-1.5 py-0.5 text-[10px] font-bold uppercase text-brand">Added</span>}
                      <EntityBadges entityKey={b.key} />
                    </div>
                    <p className="text-xs text-faint">{b.city || '—'}{b.listingCount > 0 && ` · ${b.listingCount} listings`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {bizListings.length > 0 && (
                    <button onClick={() => setOpenBiz(openBiz === b.key ? null : b.key)} className="btn-ghost btn-sm">
                      <ChevronRight size={14} className={cn('transition-transform', openBiz === b.key && 'rotate-90')} /> Products
                    </button>
                  )}
                  {b.custom ? (
                    <button onClick={() => removeCustom(b.key)} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-deal hover:bg-deal/10" title="Delete added business"><Trash2 size={15} /></button>
                  ) : (
                    <EntityActions entityKey={b.key} label={b.name} />
                  )}
                </div>
              </div>

              {openBiz === b.key && bizListings.length > 0 && (
                <div className="border-t border-line bg-elevated/40 p-3">
                  <div className="flex flex-col gap-2">
                    {bizListings.map((l) => <ListingRow key={l.key} l={l} compact />)}
                  </div>
                </div>
              )}
            </div>
          )
        })}
        {shown.length === 0 && <div className="card p-10 text-center text-muted">No businesses match.</div>}
      </div>
      {adding && <AddEntityModal kind="business" onClose={() => setAdding(false)} />}
      <BulkBar selected={Array.from(sel)} onClear={() => setSel(new Set())} />
    </div>
  )
}

/* ───────────────────────── Listings ───────────────────────── */

function ListingsTab() {
  const custom = useAdminOverrides((s) => s.custom)
  const removeCustom = useAdminOverrides((s) => s.removeCustom)
  const [q, setQ] = useState('')
  const [vf, setVf] = useState<VFilter>('all')
  const [adding, setAdding] = useState(false)
  const [sel, setSel] = useState<Set<string>>(new Set())
  const toggleSel = (k: string) => setSel((s) => { const n = new Set(s); n.has(k) ? n.delete(k) : n.add(k); return n })

  const seed = useMemo(() => adminListings(), [])
  const customListings = custom.filter((c) => c.kind === 'listing')

  const all = [
    ...seed.map((l) => ({ ...l, custom: false })),
    ...customListings.map((c) => ({ key: c.key, businessKey: c.businessKey ?? '', vertical: c.vertical, slug: c.key, name: c.name, emoji: c.emoji, from: c.from, to: c.to, priceLabel: c.price ? `Rs ${c.price.toLocaleString('en-US')}` : '—', price: c.price ?? 0, href: '#', sub: c.sub ?? '', custom: true })),
  ]

  const shown = all.filter((l) => (vf === 'all' || l.vertical === vf) && (!q.trim() || `${l.name} ${l.sub}`.toLowerCase().includes(q.toLowerCase()))).slice(0, 200)
  const visKeys = shown.filter((l) => !l.custom).map((l) => l.key)
  const allSel = visKeys.length > 0 && visKeys.every((k) => sel.has(k))

  return (
    <div className="flex flex-col gap-4">
      <Toolbar q={q} setQ={setQ} vf={vf} setVf={setVf} onAdd={() => setAdding(true)} addLabel="Add listing" />
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">{shown.length} listings</p>
        {visKeys.length > 0 && (
          <button onClick={() => setSel(allSel ? new Set() : new Set(visKeys))} className="text-xs font-semibold text-brand hover:underline">
            {allSel ? 'Deselect all' : 'Select all'}
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {shown.map((l) => (
          <ListingRow key={l.key} l={l} onDeleteCustom={l.custom ? () => removeCustom(l.key) : undefined} checked={sel.has(l.key)} onToggleSel={l.custom ? undefined : () => toggleSel(l.key)} />
        ))}
        {shown.length === 0 && <div className="card p-10 text-center text-muted">No listings match.</div>}
      </div>
      {adding && <AddEntityModal kind="listing" onClose={() => setAdding(false)} />}
      <BulkBar selected={Array.from(sel)} onClear={() => setSel(new Set())} />
    </div>
  )
}

/* ───────────────────────── shared bits ───────────────────────── */

function Toolbar({ q, setQ, vf, setVf, onAdd, addLabel }: { q: string; setQ: (v: string) => void; vf: VFilter; setVf: (v: VFilter) => void; onAdd: () => void; addLabel: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex gap-1 overflow-x-auto rounded-xl border border-line bg-surface p-1 no-scrollbar">
        {(['all', 'shop', 'food', 'health', 'services'] as VFilter[]).map((v) => (
          <button key={v} onClick={() => setVf(v)} className={cn('shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium capitalize', vf === v ? 'bg-brand text-brand-fg' : 'text-muted hover:text-ink')}>{v}</button>
        ))}
      </div>
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-surface px-3">
        <Search size={15} className="text-faint" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="h-9 w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint" />
      </div>
      <button onClick={onAdd} className="btn-primary btn-sm"><Plus size={15} /> {addLabel}</button>
    </div>
  )
}

interface RowListing { key: string; name: string; emoji: string; from: string; to: string; priceLabel: string; price: number; sub: string; vertical: string }

function ListingRow({ l, compact, onDeleteCustom, checked, onToggleSel }: { l: RowListing; compact?: boolean; onDeleteCustom?: () => void; checked?: boolean; onToggleSel?: () => void }) {
  const prices = useAdminOverrides((s) => s.prices)
  const setPrice = useAdminOverrides((s) => s.setPrice)
  const clearPrice = useAdminOverrides((s) => s.clearPrice)
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(String(l.price))
  const override = prices[l.key]

  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-2', compact ? 'rounded-lg border border-line bg-surface p-2' : 'card p-3', checked && 'ring-2 ring-brand')}>
      <div className="flex min-w-0 items-center gap-3">
        {onToggleSel && (
          <input type="checkbox" checked={!!checked} onChange={onToggleSel} className="h-4 w-4 shrink-0 accent-[rgb(var(--brand))]" aria-label="Select" />
        )}
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white" style={{ backgroundImage: `linear-gradient(135deg, ${l.from}, ${l.to})` }}>{l.emoji}</span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-ink">{l.name}</p>
            {!compact && <span className="rounded-md bg-elevated px-1.5 py-0.5 text-[10px] font-semibold capitalize text-muted">{l.vertical}</span>}
            <EntityBadges entityKey={l.key} />
          </div>
          <p className="truncate text-xs text-faint">
            {l.sub}{' · '}
            {editing ? (
              <span className="inline-flex items-center gap-1">
                <span>Rs</span>
                <input value={val} onChange={(e) => setVal(e.target.value.replace(/\D/g, ''))} className="h-6 w-20 rounded border border-line bg-surface px-1 text-ink" autoFocus />
                <button onClick={() => { if (val) setPrice(l.key, Number(val), l.name); setEditing(false) }} className="text-success"><Check size={13} /></button>
                <button onClick={() => setEditing(false)} className="text-faint"><X size={13} /></button>
              </span>
            ) : (
              <button onClick={() => { setVal(String(override ?? l.price)); setEditing(true) }} className="inline-flex items-center gap-1 hover:text-brand">
                {override != null ? <span className="font-semibold text-brand">Rs {override.toLocaleString('en-US')}</span> : <span>{l.priceLabel}</span>}
                <Pencil size={11} />
              </button>
            )}
            {override != null && <button onClick={() => clearPrice(l.key)} className="ml-1 text-[10px] text-deal hover:underline">reset</button>}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {onDeleteCustom ? (
          <button onClick={onDeleteCustom} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-deal hover:bg-deal/10" title="Delete added listing"><Trash2 size={15} /></button>
        ) : (
          <EntityActions entityKey={l.key} label={l.name} />
        )}
      </div>
    </div>
  )
}
