'use client'

import { Search, X, TrendingUp, Clock, CornerDownLeft } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { universalSearch } from '@/lib/directory'
import { trending } from '@/lib/catalog'
import { cn } from '@/lib/cn'
import { useUI } from '@/store/ui'

const POPULAR = ['Biryani', 'Dentist', 'AC service', 'Lawn suit', 'Cleaning', 'Earbuds', 'Cold coffee']
const VERTICAL_TINT: Record<string, string> = { shop: 'text-brand', food: 'text-accent', health: 'text-sky-500', services: 'text-violet-500' }

export function SearchCommand() {
  const open = useUI((s) => s.searchOpen)
  const openSearch = useUI((s) => s.openSearch)
  const close = useUI((s) => s.closeSearch)
  const router = useRouter()
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => universalSearch(q, 4).slice(0, 10), [q])
  const hot = useMemo(() => trending(4), [])

  // Global Cmd/Ctrl+K to open, Esc to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        openSearch()
      }
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openSearch, close])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
    else setQ('')
  }, [open])

  const go = (term: string) => {
    if (!term.trim()) return
    close()
    router.push(`/find?q=${encodeURIComponent(term.trim())}`)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[8vh] sm:pt-[12vh]">
      <button aria-label="Close search" className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in" onClick={close} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-pop animate-scale-in">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            go(q)
          }}
          className="flex items-center gap-2 border-b border-line px-4"
        >
          <Search size={18} className="shrink-0 text-faint" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, food, doctors, services…"
            className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-faint"
          />
          <button type="button" onClick={close} className="grid h-7 w-7 place-items-center rounded-md text-faint hover:bg-elevated hover:text-ink">
            <X size={16} />
          </button>
        </form>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {q.trim() ? (
            results.length ? (
              <>
                {results.map((r) => (
                  <Link
                    key={r.kind + r.href + r.label}
                    href={r.href}
                    onClick={close}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-elevated"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg text-base text-white" style={{ backgroundImage: `linear-gradient(135deg, ${r.from}, ${r.to})` }}>{r.emoji}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-ink">{r.label}</span>
                      <span className="block truncate text-xs text-faint">{r.sub}</span>
                    </span>
                    {r.price && <span className="shrink-0 text-xs font-bold text-ink tabular">{r.price}</span>}
                    <span className={cn('text-[10px] font-semibold uppercase', VERTICAL_TINT[r.vertical])}>{r.vertical}</span>
                  </Link>
                ))}
                <button
                  onClick={() => go(q)}
                  className="mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-brand hover:bg-brand-soft"
                >
                  Search “{q}” <CornerDownLeft size={15} />
                </button>
              </>
            ) : (
              <p className="px-3 py-8 text-center text-sm text-muted">No matches. Press Enter to search anyway.</p>
            )
          ) : (
            <>
              <p className="flex items-center gap-1.5 px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-faint">
                <Clock size={12} /> Popular searches
              </p>
              <div className="flex flex-wrap gap-2 px-3 pb-3 pt-1">
                {POPULAR.map((t) => (
                  <button key={t} onClick={() => go(t)} className="chip">
                    {t}
                  </button>
                ))}
              </div>
              <p className="flex items-center gap-1.5 px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-faint">
                <TrendingUp size={12} /> Trending now
              </p>
              {hot.map((p) => (
                <Link key={p.slug} href={`/product/${p.slug}`} onClick={close} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-elevated">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-elevated text-base">{p.emoji}</span>
                  <span className="min-w-0 flex-1 truncate font-medium text-ink">{p.name}</span>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
