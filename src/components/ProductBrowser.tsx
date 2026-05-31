'use client'

import { SlidersHorizontal, X, Star, Check, ArrowDownUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Product } from '@/data/types'
import type { Sort } from '@/lib/catalog'
import { allCategories, allShops, isOnSale, isSoldOut } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/cn'
import { ProductGrid } from '@/components/ProductGrid'

const SORTS: { value: Sort; label: string }[] = [
  { value: 'relevance', label: 'Most relevant' },
  { value: 'popular', label: 'Best selling' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'newest', label: 'Newest' },
]

export function ProductBrowser({
  products,
  enableCategoryFilter = false,
  enableShopFilter = false,
}: {
  products: Product[]
  enableCategoryFilter?: boolean
  enableShopFilter?: boolean
}) {
  const bounds = useMemo(() => {
    const ps = products.map((p) => p.price)
    return { min: Math.min(...ps, 0), max: Math.max(...ps, 0) }
  }, [products])

  const [sort, setSort] = useState<Sort>('relevance')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [inStock, setInStock] = useState(false)
  const [onSale, setOnSale] = useState(false)
  const [freeShip, setFreeShip] = useState(false)
  const [cats, setCats] = useState<Set<string>>(new Set())
  const [shopSel, setShopSel] = useState<Set<string>>(new Set())
  const [sheet, setSheet] = useState(false)

  const catFacets = useMemo(() => {
    const present = new Set(products.map((p) => p.category))
    return allCategories.filter((c) => present.has(c.slug))
  }, [products])
  const shopFacets = useMemo(() => {
    const present = new Set(products.map((p) => p.shop))
    return allShops.filter((s) => present.has(s.slug))
  }, [products])

  const filtered = useMemo(() => {
    const lo = min ? Number(min) : -Infinity
    const hi = max ? Number(max) : Infinity
    let list = products.filter((p) => {
      if (p.price < lo || p.price > hi) return false
      if (minRating && p.rating < minRating) return false
      if (inStock && isSoldOut(p)) return false
      if (onSale && !isOnSale(p)) return false
      if (freeShip && !p.freeShipping) return false
      if (cats.size && !cats.has(p.category)) return false
      if (shopSel.size && !shopSel.has(p.shop)) return false
      return true
    })
    switch (sort) {
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break
      case 'rating': list = [...list].sort((a, b) => b.rating - a.rating); break
      case 'newest': list = [...list].sort((a, b) => a.createdDaysAgo - b.createdDaysAgo); break
      case 'popular':
      case 'relevance':
      default: list = [...list].sort((a, b) => b.sold - a.sold)
    }
    return list
  }, [products, min, max, minRating, inStock, onSale, freeShip, cats, shopSel, sort])

  const activeCount = (min ? 1 : 0) + (max ? 1 : 0) + (minRating ? 1 : 0) + (inStock ? 1 : 0) + (onSale ? 1 : 0) + (freeShip ? 1 : 0) + cats.size + shopSel.size
  const reset = () => {
    setMin(''); setMax(''); setMinRating(0); setInStock(false); setOnSale(false); setFreeShip(false); setCats(new Set()); setShopSel(new Set())
  }
  const toggle = (set: Set<string>, setter: (s: Set<string>) => void, v: string) => {
    const next = new Set(set)
    next.has(v) ? next.delete(v) : next.add(v)
    setter(next)
  }

  const Panel = () => (
    <div className="flex flex-col gap-5">
      {enableCategoryFilter && catFacets.length > 1 && (
        <Facet title="Category">
          {catFacets.map((c) => (
            <CheckRow key={c.slug} label={c.name} checked={cats.has(c.slug)} onChange={() => toggle(cats, setCats, c.slug)} />
          ))}
        </Facet>
      )}
      {enableShopFilter && shopFacets.length > 1 && (
        <Facet title="Shop">
          {shopFacets.map((s) => (
            <CheckRow key={s.slug} label={`${s.emoji} ${s.name}`} checked={shopSel.has(s.slug)} onChange={() => toggle(shopSel, setShopSel, s.slug)} />
          ))}
        </Facet>
      )}
      <Facet title="Price (Rs)">
        <div className="flex items-center gap-2">
          <input value={min} onChange={(e) => setMin(e.target.value.replace(/\D/g, ''))} placeholder={String(bounds.min)} inputMode="numeric" className="input h-9 text-sm" />
          <span className="text-faint">–</span>
          <input value={max} onChange={(e) => setMax(e.target.value.replace(/\D/g, ''))} placeholder={String(bounds.max)} inputMode="numeric" className="input h-9 text-sm" />
        </div>
      </Facet>
      <Facet title="Rating">
        {[4, 3].map((r) => (
          <button key={r} onClick={() => setMinRating(minRating === r ? 0 : r)} className={cn('flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-elevated', minRating === r && 'bg-brand-soft')}>
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className={i < r ? 'fill-amber-400 text-amber-400' : 'text-line'} />
              ))}
            </span>
            <span className="text-muted">& up</span>
          </button>
        ))}
      </Facet>
      <Facet title="Offers">
        <CheckRow label="On sale" checked={onSale} onChange={() => setOnSale(!onSale)} />
        <CheckRow label="Free delivery" checked={freeShip} onChange={() => setFreeShip(!freeShip)} />
        <CheckRow label="In stock only" checked={inStock} onChange={() => setInStock(!inStock)} />
      </Facet>
      {activeCount > 0 && (
        <button onClick={reset} className="btn-ghost btn-sm self-start">
          <X size={14} /> Clear all ({activeCount})
        </button>
      )}
    </div>
  )

  return (
    <div className="container-app">
      {/* toolbar */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-muted">
          <span className="font-bold text-ink">{filtered.length}</span> {filtered.length === 1 ? 'result' : 'results'}
        </p>
        <div className="flex items-center gap-2">
          <button onClick={() => setSheet(true)} className="btn-ghost btn-sm lg:hidden">
            <SlidersHorizontal size={15} /> Filters{activeCount > 0 && ` (${activeCount})`}
          </button>
          <label className="flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 text-sm">
            <ArrowDownUp size={14} className="text-faint" />
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-9 bg-transparent pr-1 text-sm font-medium text-ink outline-none">
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[230px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-32 card p-4">
            <Panel />
          </div>
        </aside>

        <div>
          {filtered.length ? (
            <ProductGrid products={filtered} className="lg:grid-cols-3 xl:grid-cols-4" />
          ) : (
            <div className="card flex flex-col items-center gap-2 p-12 text-center">
              <span className="text-4xl">🔍</span>
              <p className="font-semibold text-ink">No products match these filters</p>
              <button onClick={reset} className="btn-primary btn-sm mt-2">Clear filters</button>
            </div>
          )}
        </div>
      </div>

      {/* mobile sheet */}
      {sheet && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button aria-label="Close filters" className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setSheet(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-line bg-surface p-4 animate-slide-up">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-ink">Filters</h3>
              <button onClick={() => setSheet(false)} className="grid h-8 w-8 place-items-center rounded-lg text-faint hover:bg-elevated"><X size={18} /></button>
            </div>
            <Panel />
            <button onClick={() => setSheet(false)} className="btn-primary btn-lg mt-5 w-full">Show {filtered.length} results</button>
          </div>
        </div>
      )}
    </div>
  )
}

function Facet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-faint">{title}</p>
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-elevated">
      <span className={cn('grid h-4 w-4 place-items-center rounded border', checked ? 'border-brand bg-brand text-brand-fg' : 'border-line')}>
        {checked && <Check size={11} />}
      </span>
      <span className="flex-1 truncate text-ink">{label}</span>
    </button>
  )
}
