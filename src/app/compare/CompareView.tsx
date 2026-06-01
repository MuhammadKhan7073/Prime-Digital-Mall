'use client'

import Link from 'next/link'
import { Scale, X, Check, Minus, Truck } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatPrice, percentOff } from '@/lib/format'
import { getProduct, shopOf, categoryOf, isSoldOut } from '@/lib/catalog'
import { useHydrated } from '@/lib/useHydrated'
import { useCompare } from '@/store/compare'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductImage } from '@/components/ui/ProductImage'
import { Stars } from '@/components/ui/Stars'
import { AddToCartButton } from '@/components/AddToCartButton'

export function CompareView() {
  const hydrated = useHydrated()
  const slugs = useCompare((s) => s.slugs)
  const remove = useCompare((s) => s.remove)
  const clear = useCompare((s) => s.clear)
  const products = hydrated ? slugs.map(getProduct).filter(Boolean) : []

  if (hydrated && products.length === 0) {
    return (
      <div className="container-app">
        <Breadcrumbs items={[{ label: 'Compare' }]} />
        <div className="card mx-auto flex max-w-md flex-col items-center gap-3 p-12 text-center">
          <span className="text-5xl">⚖️</span>
          <p className="text-lg font-bold text-ink">Nothing to compare yet</p>
          <p className="text-sm text-muted">Tap the compare icon on any product (up to 4) to line them up side by side.</p>
          <Link href="/shop" className="btn-primary btn-md mt-2">Browse products</Link>
        </div>
      </div>
    )
  }

  // build the attribute rows
  const rows: { label: string; render: (p: NonNullable<ReturnType<typeof getProduct>>) => React.ReactNode }[] = [
    { label: 'Price', render: (p) => <Price p={p} /> },
    { label: 'Rating', render: (p) => <Stars rating={p.rating} count={p.reviewCount} size={12} /> },
    { label: 'Shop', render: (p) => shopOf(p)?.name ?? '—' },
    { label: 'Category', render: (p) => categoryOf(p)?.name ?? '—' },
    { label: 'Sold', render: (p) => p.sold.toLocaleString() },
    { label: 'In stock', render: (p) => isSoldOut(p) ? <Minus size={15} className="text-faint" /> : <Check size={15} className="text-success" /> },
    { label: 'Free delivery', render: (p) => p.freeShipping ? <span className="inline-flex items-center gap-1 text-success"><Truck size={13} /> Yes</span> : <Minus size={15} className="text-faint" /> },
    { label: 'Highlights', render: (p) => <ul className="space-y-0.5 text-left text-xs text-muted">{p.highlights.slice(0, 3).map((h) => <li key={h}>• {h}</li>)}</ul> },
  ]

  return (
    <div className="container-app">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={[{ label: 'Compare' }]} />
        {products.length > 0 && <button onClick={clear} className="text-xs font-medium text-faint hover:text-deal">Clear all</button>}
      </div>
      <h1 className="mb-5 flex items-center gap-2 font-display text-2xl font-bold text-ink"><Scale size={22} className="text-brand" /> Compare</h1>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr>
              <th className="w-28 align-top" />
              {products.map((p) => p && (
                <th key={p.slug} className="p-2 align-top">
                  <div className="card relative flex flex-col items-center gap-2 p-3">
                    <button onClick={() => remove(p.slug)} className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-elevated text-faint hover:text-deal" aria-label="Remove"><X size={13} /></button>
                    <Link href={`/product/${p.slug}`}>
                      <ProductImage from={p.from} to={p.to} emoji={p.emoji} className="h-24 w-24 rounded-xl" emojiClassName="text-4xl" />
                    </Link>
                    <Link href={`/product/${p.slug}`} className="line-clamp-2 text-center text-sm font-semibold text-ink hover:text-brand">{p.name}</Link>
                    <AddToCartButton product={p} size="sm" full label="Add" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={row.label} className={cn(ri % 2 ? 'bg-surface' : 'bg-elevated/40')}>
                <td className="p-3 align-top text-xs font-bold uppercase tracking-wide text-faint">{row.label}</td>
                {products.map((p) => p && (
                  <td key={p.slug} className="p-3 text-center align-top text-sm text-ink">{row.render(p)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Price({ p }: { p: NonNullable<ReturnType<typeof getProduct>> }) {
  const off = percentOff(p.price, p.compareAt)
  return (
    <span className="inline-flex flex-col items-center">
      <span className="font-extrabold text-ink tabular">{formatPrice(p.price)}</span>
      {off > 0 && <span className="text-xs font-bold text-deal">-{off}%</span>}
    </span>
  )
}
