import { Zap, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import { deals } from '@/lib/catalog'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductBrowser } from '@/components/ProductBrowser'
import { Countdown } from '@/components/Countdown'

export const metadata: Metadata = { title: 'Today’s Deals', description: 'The biggest discounts across Prime Digital Mall.' }

export default function DealsPage() {
  const products = deals(60)
  return (
    <div className="flex flex-col gap-2">
      <div className="container-app">
        <Breadcrumbs items={[{ label: 'Deals' }]} />
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-deal text-white"><Zap size={20} className="fill-current" /></span>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-deal">Today’s Deals</h1>
            <p className="text-sm text-muted">{products.length} discounted products — biggest savings first</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-deal/30 bg-deal/10 px-3 py-2 text-sm font-semibold text-deal">
            <Clock size={15} /> Ends in <Countdown />
          </span>
        </div>
      </div>
      <ProductBrowser products={products} enableCategoryFilter enableShopFilter />
    </div>
  )
}
