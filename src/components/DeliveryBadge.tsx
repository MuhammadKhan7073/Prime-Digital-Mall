import { MapPin, Store, Truck } from 'lucide-react'
import type { Shop } from '@/data/types'
import { cn } from '@/lib/cn'
import { deliveryLabel } from '@/lib/catalog'

export function DeliveryBadge({ shop, className }: { shop: Shop; className?: string }) {
  const Icon = shop.delivery === 'pakistan' ? Truck : shop.delivery === 'city' ? MapPin : Store
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2 py-0.5 text-[11px] font-medium text-muted', className)}>
      <Icon size={12} className="text-brand" />
      {deliveryLabel(shop)}
    </span>
  )
}
