'use client'

import { Check, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/cn'
import type { Product } from '@/data/types'
import { isSoldOut } from '@/lib/catalog'
import { defaultVariant, variantSummary } from '@/lib/variant'
import { useCart } from '@/store/cart'
import { useUI } from '@/store/ui'

export function AddToCartButton({
  product,
  qty = 1,
  variant,
  className,
  full = false,
  size = 'md',
  openDrawer = true,
  label = 'Add to cart',
  icon = true,
}: {
  product: Product
  qty?: number
  variant?: Record<string, string>
  className?: string
  full?: boolean
  size?: 'sm' | 'md' | 'lg'
  openDrawer?: boolean
  label?: string
  icon?: boolean
}) {
  const add = useCart((s) => s.add)
  const openCart = useUI((s) => s.openCart)
  const toast = useUI((s) => s.toast)
  const [done, setDone] = useState(false)
  const out = isSoldOut(product)

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (out) return
    const v = variant ?? defaultVariant(product)
    add(product.slug, qty, v)
    const sum = variantSummary(v)
    toast(`Added${sum ? ` (${sum})` : ''} to cart`, { href: '/cart', hrefLabel: 'View cart' })
    if (openDrawer) openCart()
    setDone(true)
    setTimeout(() => setDone(false), 1100)
  }

  const sizeCls = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : 'btn-md'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={out}
      className={cn('btn-primary', sizeCls, full && 'w-full', className)}
    >
      {icon && (done ? <Check size={size === 'sm' ? 14 : 18} /> : <ShoppingCart size={size === 'sm' ? 14 : 18} />)}
      {out ? 'Sold out' : done ? 'Added!' : label}
    </button>
  )
}
