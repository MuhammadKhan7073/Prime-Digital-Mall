'use client'

import { Truck, PartyPopper } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/format'
import { FREE_SHIP_THRESHOLD } from '@/lib/catalog'
import { useHydrated } from '@/lib/useHydrated'
import { cartSubtotal, useCart } from '@/store/cart'

/** Free-delivery progress nudge — a classic basket-builder for impulse upsell. */
export function FreeShipBar({ className, subtotal: ext }: { className?: string; subtotal?: number }) {
  const hydrated = useHydrated()
  const storeSubtotal = useCart(cartSubtotal)
  const subtotal = ext ?? (hydrated ? storeSubtotal : 0)
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal)
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100))
  const unlocked = remaining === 0 && subtotal > 0

  return (
    <div className={cn('rounded-xl border border-line bg-elevated p-3', className)}>
      <p className="flex items-center gap-1.5 text-xs font-medium text-ink">
        {unlocked ? (
          <>
            <PartyPopper size={14} className="text-success" /> You’ve unlocked <span className="text-success">free delivery!</span>
          </>
        ) : (
          <>
            <Truck size={14} className="text-brand" /> Add <span className="font-bold text-brand">{formatPrice(remaining)}</span> more for free delivery
          </>
        )}
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
        <div
          className={cn('h-full rounded-full transition-all duration-500', unlocked ? 'bg-success' : 'bg-brand')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
