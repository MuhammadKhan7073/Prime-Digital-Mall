'use client'

import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { formatPrice } from '@/lib/format'
import { getRestaurant } from '@/lib/food'
import { useHydrated } from '@/lib/useHydrated'
import { foodCount, foodSubtotal, useFoodCart } from '@/store/foodcart'

/** Persistent bottom bar shown whenever the food cart has items. */
export function FoodCartBar() {
  const hydrated = useHydrated()
  const count = useFoodCart(foodCount)
  const subtotal = useFoodCart(foodSubtotal)
  const restaurant = useFoodCart((s) => s.restaurant)
  if (!hydrated || count === 0) return null
  const r = restaurant ? getRestaurant(restaurant) : undefined

  return (
    <div className="fixed inset-x-0 bottom-14 z-40 px-3 lg:bottom-4">
      <Link
        href="/foodcart"
        className="container-app flex items-center gap-3 rounded-2xl px-4 py-3 text-white shadow-pop"
        style={{ backgroundImage: 'linear-gradient(135deg, #c2410c, #f59e0b)' }}
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/25 text-sm font-bold">{count}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold leading-tight">View food order</span>
          {r && <span className="block truncate text-xs text-white/85">{r.name}</span>}
        </span>
        <span className="font-extrabold tabular">{formatPrice(subtotal)}</span>
        <ArrowRight size={18} />
      </Link>
    </div>
  )
}
