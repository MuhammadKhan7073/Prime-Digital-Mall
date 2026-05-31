'use client'

import { Heart } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useHydrated } from '@/lib/useHydrated'
import { useWishlist } from '@/store/wishlist'
import { useUI } from '@/store/ui'

export function WishlistButton({
  slug,
  className,
  size = 18,
  floating = false,
}: {
  slug: string
  className?: string
  size?: number
  floating?: boolean
}) {
  const hydrated = useHydrated()
  const saved = useWishlist((s) => (hydrated ? s.slugs.includes(slug) : false))
  const toggle = useWishlist((s) => s.toggle)
  const toast = useUI((s) => s.toast)

  return (
    <button
      type="button"
      aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(slug)
        toast(saved ? 'Removed from wishlist' : 'Saved to wishlist ❤️', { kind: 'info', href: '/wishlist', hrefLabel: 'View' })
      }}
      className={cn(
        'grid place-items-center transition-all active:scale-90',
        floating && 'h-9 w-9 rounded-full border border-line bg-surface/90 backdrop-blur shadow-card hover:bg-surface',
        className,
      )}
    >
      <Heart size={size} className={cn('transition-colors', saved ? 'fill-deal text-deal' : 'text-muted')} />
    </button>
  )
}
