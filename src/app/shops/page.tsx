import type { Metadata } from 'next'
import { Store } from 'lucide-react'
import { shopsWithCounts } from '@/lib/catalog'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ShopCard } from '@/components/ShopCard'

export const metadata: Metadata = { title: 'All Shops', description: 'Browse trusted shops across Pakistan.' }

export default function ShopsPage() {
  const shops = shopsWithCounts().sort((a, b) => b.rating - a.rating)
  return (
    <div className="container-app">
      <Breadcrumbs items={[{ label: 'Shops' }]} />
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-brand-fg"><Store size={22} /></span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">All Shops</h1>
          <p className="text-sm text-muted">{shops.length} trusted sellers across Pakistan</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {shops.map((s) => (
          <ShopCard key={s.slug} shop={s} />
        ))}
      </div>
    </div>
  )
}
