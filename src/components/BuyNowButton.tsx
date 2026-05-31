'use client'

import { Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/cn'
import type { Product } from '@/data/types'
import { isSoldOut } from '@/lib/catalog'
import { defaultVariant } from '@/lib/variant'
import { useCart } from '@/store/cart'

export function BuyNowButton({
  product,
  qty = 1,
  variant,
  className,
  full = false,
  size = 'md',
}: {
  product: Product
  qty?: number
  variant?: Record<string, string>
  className?: string
  full?: boolean
  size?: 'sm' | 'md' | 'lg'
}) {
  const add = useCart((s) => s.add)
  const router = useRouter()
  const out = isSoldOut(product)
  const sizeCls = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : 'btn-md'

  return (
    <button
      type="button"
      disabled={out}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (out) return
        add(product.slug, qty, variant ?? defaultVariant(product))
        router.push('/checkout')
      }}
      className={cn('btn-deal', sizeCls, full && 'w-full', className)}
    >
      <Zap size={size === 'sm' ? 14 : 18} className="fill-current" />
      Buy now
    </button>
  )
}
