'use client'

import { useSearchParams } from 'next/navigation'
import { Search as SearchIcon } from 'lucide-react'
import { allProducts, filterProducts } from '@/lib/catalog'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductBrowser } from '@/components/ProductBrowser'

export function SearchResults() {
  const params = useSearchParams()
  const q = (params.get('q') ?? '').trim()
  const results = q ? filterProducts({ query: q }) : allProducts

  return (
    <div className="flex flex-col gap-2">
      <div className="container-app">
        <Breadcrumbs items={[{ label: q ? `Search: ${q}` : 'All products' }]} />
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-brand-fg"><SearchIcon size={20} /></span>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-ink">{q ? `Results for “${q}”` : 'All products'}</h1>
            <p className="text-sm text-muted">{results.length} {results.length === 1 ? 'item' : 'items'} found</p>
          </div>
        </div>
      </div>
      <ProductBrowser products={results} enableCategoryFilter enableShopFilter />
    </div>
  )
}
