import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Success } from './Success'

export const metadata: Metadata = { title: 'Order Confirmed', robots: { index: false } }

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="container-app py-20 text-center text-muted">Loading…</div>}>
      <Success />
    </Suspense>
  )
}
