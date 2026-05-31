'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search as SearchIcon } from 'lucide-react'
import { universalSearch } from '@/lib/directory'
import { getVertical } from '@/data/verticals'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductImage } from '@/components/ui/ProductImage'

const VERTICAL_LABEL: Record<string, string> = { shop: 'Shopping', food: 'Food', health: 'Health', services: 'Services' }

export function FindResults() {
  const params = useSearchParams()
  const q = (params.get('q') ?? '').trim()
  const results = universalSearch(q, 12)

  const grouped = results.reduce<Record<string, typeof results>>((acc, r) => {
    ;(acc[r.vertical] ??= []).push(r)
    return acc
  }, {})

  return (
    <div className="container-app">
      <Breadcrumbs items={[{ label: q ? `Search: ${q}` : 'Search' }]} />
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-brand-fg"><SearchIcon size={20} /></span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">{q ? `Results for “${q}”` : 'Search everything'}</h1>
          <p className="text-sm text-muted">{results.length} matches across all of Prime Digital Mall</p>
        </div>
      </div>

      {q && results.length === 0 && (
        <div className="card p-12 text-center">
          <span className="text-4xl">🔍</span>
          <p className="mt-2 font-semibold text-ink">No matches for “{q}”</p>
          <p className="text-sm text-muted">Try a product, dish, doctor, or service.</p>
        </div>
      )}

      <div className="flex flex-col gap-8">
        {Object.entries(grouped).map(([vertical, items]) => {
          const v = getVertical(vertical)
          return (
            <section key={vertical}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-ink">{VERTICAL_LABEL[vertical] ?? vertical}</h2>
                {v && <Link href={v.href} className="text-sm font-semibold text-brand hover:underline">Browse {v.short}</Link>}
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((r) => (
                  <Link key={r.kind + r.href + r.label} href={r.href} className="group flex items-center gap-3 rounded-xl border border-line bg-surface p-2.5 transition-colors hover:border-brand">
                    <ProductImage from={r.from} to={r.to} emoji={r.emoji} className="h-12 w-12 shrink-0 rounded-lg" emojiClassName="text-xl" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink group-hover:text-brand">{r.label}</span>
                      <span className="block truncate text-xs text-faint">{r.sub}</span>
                    </span>
                    {r.price && <span className="shrink-0 text-xs font-bold text-ink tabular">{r.price}</span>}
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
