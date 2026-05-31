import Link from 'next/link'
import { BadgeCheck, Clock, Bike } from 'lucide-react'
import type { Restaurant } from '@/data/food'
import { formatPrice } from '@/lib/format'
import { ProductImage } from '@/components/ui/ProductImage'
import { Stars } from '@/components/ui/Stars'

export function RestaurantCard({ restaurant: r }: { restaurant: Restaurant }) {
  return (
    <Link href={`/food/${r.slug}`} className="group card flex flex-col overflow-hidden transition-shadow hover:shadow-pop">
      <div className="relative">
        <ProductImage from={r.from} to={r.to} emoji={r.emoji} className="aspect-[16/9] w-full" emojiClassName="text-5xl" />
        {!r.open && (
          <div className="absolute inset-0 grid place-items-center bg-bg/60 backdrop-blur-[1px]">
            <span className="rounded-lg bg-ink px-3 py-1 text-xs font-bold uppercase text-bg">Closed now</span>
          </div>
        )}
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-surface/90 px-2 py-1 text-xs font-bold text-ink shadow-card backdrop-blur">
          <Clock size={12} className="text-brand" /> {r.deliveryMins} min
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="flex items-center gap-1">
          <h3 className="truncate font-bold text-ink group-hover:text-brand">{r.name}</h3>
          {r.verified && <BadgeCheck size={15} className="shrink-0 text-brand" />}
        </div>
        <p className="line-clamp-1 text-xs text-muted">{r.tagline}</p>
        <div className="flex items-center justify-between">
          <Stars rating={r.rating} count={r.ratingCount} showValue />
          <span className="text-xs text-faint">{'₨'.repeat(r.priceTier)}</span>
        </div>
        <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-muted">
          <Bike size={12} className="text-success" /> {r.deliveryFee === 0 ? 'Free delivery' : `${formatPrice(r.deliveryFee)} delivery`} · min {formatPrice(r.minOrder)}
        </span>
      </div>
    </Link>
  )
}
