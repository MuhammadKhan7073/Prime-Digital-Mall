import Link from 'next/link'
import { Zap, ChevronRight } from 'lucide-react'
import type { Product } from '@/data/types'
import { Countdown } from './Countdown'
import { ProductRow } from './ProductRow'

export function FlashStrip({ products }: { products: Product[] }) {
  if (!products.length) return null
  return (
    <section className="container-app">
      <div className="overflow-hidden rounded-3xl border border-deal/30 bg-gradient-to-br from-deal/10 to-transparent p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="flex items-center gap-1.5 text-lg font-extrabold tracking-tight text-deal sm:text-xl">
              <Zap size={20} className="fill-deal" /> Flash Deals
            </h2>
            <span className="hidden items-center gap-1.5 text-sm text-muted sm:flex">
              Ends in <Countdown />
            </span>
          </div>
          <Link href="/deals" className="inline-flex items-center gap-0.5 text-sm font-semibold text-deal hover:underline">
            All deals <ChevronRight size={16} />
          </Link>
        </div>
        <div className="mb-3 flex items-center gap-1.5 text-sm text-muted sm:hidden">
          Ends in <Countdown />
        </div>
        <ProductRow products={products} />
      </div>
    </section>
  )
}
