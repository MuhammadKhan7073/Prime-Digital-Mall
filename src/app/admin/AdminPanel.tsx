'use client'

import { useEffect, useMemo, useState } from 'react'
import { Lock, ShieldCheck, Check, X, Trash2, Store, UtensilsCrossed, Stethoscope, Wrench, RefreshCw, Database, HardDrive, Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useHydrated } from '@/lib/useHydrated'
import { backendMode, fetchSubmissionsRemote, setStatusRemote } from '@/lib/backend'
import { useSubmissions, type BusinessSubmission, type SubmissionStatus } from '@/store/submissions'

const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_CODE || 'prime-admin'

const VICON: Record<string, typeof Store> = { shop: Store, food: UtensilsCrossed, health: Stethoscope, services: Wrench }
const STATUS_STYLE: Record<SubmissionStatus, string> = {
  pending: 'bg-warn/15 text-warn',
  approved: 'bg-success/15 text-success',
  rejected: 'bg-deal/15 text-deal',
}

export function AdminPanel() {
  const hydrated = useHydrated()
  const [authed, setAuthed] = useState(false)
  const [code, setCode] = useState('')

  // demo store
  const localItems = useSubmissions((s) => s.items)
  const setLocalStatus = useSubmissions((s) => s.setStatus)
  const removeLocal = useSubmissions((s) => s.remove)

  // remote
  const [remoteItems, setRemoteItems] = useState<BusinessSubmission[]>([])
  const [loading, setLoading] = useState(false)

  const [filter, setFilter] = useState<'all' | SubmissionStatus>('pending')
  const [q, setQ] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('pdm-admin') === '1') setAuthed(true)
  }, [])

  const loadRemote = async () => {
    if (backendMode !== 'supabase') return
    setLoading(true)
    try { setRemoteItems(await fetchSubmissionsRemote()) } catch { /* ignore */ } finally { setLoading(false) }
  }
  useEffect(() => { if (authed) loadRemote() }, [authed]) // eslint-disable-line react-hooks/exhaustive-deps

  const items = backendMode === 'supabase' ? remoteItems : localItems

  const setStatus = async (id: string, status: SubmissionStatus) => {
    if (backendMode === 'supabase') {
      try { await setStatusRemote(id, status); await loadRemote() } catch { /* ignore */ }
    } else {
      setLocalStatus(id, status)
    }
  }

  const stats = useMemo(() => ({
    total: items.length,
    pending: items.filter((i) => i.status === 'pending').length,
    approved: items.filter((i) => i.status === 'approved').length,
    rejected: items.filter((i) => i.status === 'rejected').length,
  }), [items])

  const shown = useMemo(() => {
    let list = items
    if (filter !== 'all') list = list.filter((i) => i.status === filter)
    if (q.trim()) {
      const t = q.toLowerCase()
      list = list.filter((i) => `${i.businessName} ${i.ownerName} ${i.city} ${i.category}`.toLowerCase().includes(t))
    }
    return list
  }, [items, filter, q])

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
        <div className="flex items-center gap-2">
          {backendMode === 'supabase' && (
            <button onClick={loadRemote} className="btn-ghost btn-sm"><RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh</button>
          )}
          <button onClick={() => { setAuthed(false); sessionStorage.removeItem('pdm-admin') }} className="btn-ghost btn-sm">Lock</button>
        </div>
      </div>

      {/* stats */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { k: 'Total', v: stats.total, c: 'text-ink' },
          { k: 'Pending', v: stats.pending, c: 'text-warn' },
          { k: 'Approved', v: stats.approved, c: 'text-success' },
          { k: 'Rejected', v: stats.rejected, c: 'text-deal' },
        ].map((s) => (
          <div key={s.k} className="card p-4">
            <p className="text-xs text-muted">{s.k}</p>
            <p className={cn('text-2xl font-extrabold tabular', s.c)}>{hydrated ? s.v : '—'}</p>
          </div>
        ))}
      </div>

      {/* controls */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex gap-1 rounded-xl border border-line bg-surface p-1">
          {(['pending', 'approved', 'rejected', 'all'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn('rounded-lg px-3 py-1.5 text-sm font-medium capitalize', filter === f ? 'bg-brand text-brand-fg' : 'text-muted hover:text-ink')}>{f}</button>
          ))}
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-surface px-3">
          <Search size={15} className="text-faint" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search businesses…" className="h-9 w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint" />
        </div>
      </div>

      {/* list */}
      {!hydrated ? null : shown.length === 0 ? (
        <div className="card flex flex-col items-center gap-2 p-12 text-center">
          <span className="text-4xl">📋</span>
          <p className="font-semibold text-ink">No {filter !== 'all' ? filter : ''} submissions</p>
          <p className="text-sm text-muted">Business signups from <code className="rounded bg-elevated px-1">/sell</code> appear here for approval.</p>
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
                        <span className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase', STATUS_STYLE[b.status])}>{b.status}</span>
                        <span className="rounded-md bg-elevated px-1.5 py-0.5 text-[10px] font-semibold capitalize text-muted">{b.vertical}</span>
                      </div>
                      <p className="text-xs text-muted">{b.category} · {b.city} · {b.ownerName}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-muted">{b.description}</p>
                      <p className="mt-1 text-[11px] text-faint">📞 {b.phone} · WhatsApp {b.whatsapp} · ref {b.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {b.status !== 'approved' && (
                      <button onClick={() => setStatus(b.id, 'approved')} className="btn inline-flex h-9 items-center gap-1 rounded-lg bg-success px-3 text-xs font-semibold text-white hover:brightness-110"><Check size={14} /> Approve</button>
                    )}
                    {b.status !== 'rejected' && (
                      <button onClick={() => setStatus(b.id, 'rejected')} className="btn inline-flex h-9 items-center gap-1 rounded-lg border border-line px-3 text-xs font-semibold text-deal hover:bg-deal/10"><X size={14} /> Reject</button>
                    )}
                    {backendMode === 'demo' && (
                      <button onClick={() => removeLocal(b.id)} className="grid h-9 w-9 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-deal" title="Delete"><Trash2 size={15} /></button>
                    )}
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
