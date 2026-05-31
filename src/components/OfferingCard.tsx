import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import type { Offering } from '@/data/services'
import { priceLabel, providerOf } from '@/lib/services'
import { ProductImage } from '@/components/ui/ProductImage'
import { Stars } from '@/components/ui/Stars'

export function OfferingCard({ offering: o }: { offering: Offering }) {
  const provider = providerOf(o)
  return (
    <Link
      data-entity={`services:listing:${o.slug}`}
      href={`/book/service/${o.slug}`}
      className="group card relative flex gap-3 p-3 transition-shadow hover:shadow-pop"
    >
      <ProductImage from={o.from} to={o.to} emoji={o.emoji} className="h-20 w-20 shrink-0 rounded-xl" emojiClassName="text-3xl" />
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="truncate font-bold text-ink group-hover:text-brand">{o.name}</h3>
        {provider && <p className="truncate text-xs font-medium text-brand">{provider.name}</p>}
        <p className="mt-0.5 line-clamp-1 text-xs text-muted">{o.shortDesc}</p>
        <div className="mt-1 flex items-center gap-2">
          <Stars rating={o.rating} count={o.reviewCount} size={12} />
          <span className="inline-flex items-center gap-0.5 text-[11px] text-faint"><Clock size={11} /> {o.durationLabel}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-sm font-bold text-ink tabular">{priceLabel(o)}</span>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-brand">Book <ArrowRight size={13} /></span>
        </div>
      </div>
    </Link>
  )
}
