import { Suspense } from 'react'
import type { Metadata } from 'next'
import { FindResults } from './FindResults'

export const metadata: Metadata = { title: 'Search everything', alternates: { canonical: '/find' } }

export default function FindPage() {
  return (
    <Suspense fallback={<div className="container-app py-20 text-center text-muted">Loading…</div>}>
      <FindResults />
    </Suspense>
  )
}
