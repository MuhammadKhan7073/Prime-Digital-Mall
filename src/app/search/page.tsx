import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SearchResults } from './SearchResults'

export const metadata: Metadata = { title: 'Search', alternates: { canonical: '/search' } }

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-app py-20 text-center text-muted">Loading…</div>}>
      <SearchResults />
    </Suspense>
  )
}
