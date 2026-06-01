import Link from 'next/link'
import type { Shop } from '@/data/types'
import { cityOf, shopProductCount } from '@/lib/catalog'
import { formatCompact } from '@/lib/format'
import { Stars } from '@/components/ui/Stars'
import { DeliveryBadge } from '@/components/DeliveryBadge'
import { VerifiedTag } from '@/components/VerifiedTag'

export function ShopCard({ shop }: { shop: Shop }) {
  const city = cityOf(shop)
  return (
    <Link
      data-entity={`shop:business:${shop.slug}`}
      href={`/shop/${shop.slug}`}
      className="group card relative flex flex-col overflow-hidden transition-shadow hover:shadow-pop"
    >
      <div
        className="relative flex h-20 items-center justify-end overflow-hidden px-4"
        style={{ backgroundImage: `linear-gradient(135deg, ${shop.from}, ${shop.to})` }}
      >
        <span className="text-4xl opacity-90 drop-shadow">{shop.emoji}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center gap-1">
          <h3 className="truncate font-bold text-ink group-hover:text-brand">{shop.name}</h3>
          <VerifiedTag entityKey={`shop:business:${shop.slug}`} seedVerified={shop.verified} />
        </div>
        <p className="line-clamp-1 text-xs text-muted">{shop.tagline}</p>
        <Stars rating={shop.rating} count={shop.ratingCount} showValue />
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <DeliveryBadge shop={shop} />
          <span className="text-[11px] text-faint">
            {city?.name} · {formatCompact(shopProductCount(shop.slug))} items
          </span>
        </div>
      </div>
    </Link>
  )
}
