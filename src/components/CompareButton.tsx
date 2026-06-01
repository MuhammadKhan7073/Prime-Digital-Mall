'use client'

import { Scale, Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useHydrated } from '@/lib/useHydrated'
import { useCompare } from '@/store/compare'
import { useUI } from '@/store/ui'

export function CompareButton({ slug, className }: { slug: string; className?: string }) {
  const hydrated = useHydrated()
  const inList = useCompare((s) => (hydrated ? s.slugs.includes(slug) : false))
  const toggle = useCompare((s) => s.toggle)
  const toast = useUI((s) => s.toast)

  return (
    <button
      type="button"
      aria-label={inList ? 'Remove from compare' : 'Add to compare'}
      aria-pressed={inList}
      onClick={(e) => {
        e.preventDefault(); e.stopPropagation()
        toggle(slug)
        toast(inList ? 'Removed from compare' : 'Added to compare', { kind: 'info', href: '/compare', hrefLabel: 'Compare' })
      }}
      className={cn('grid h-9 w-9 place-items-center rounded-full border border-line bg-surface/90 backdrop-blur shadow-card transition-colors hover:bg-surface', inList && 'border-brand text-brand', className)}
    >
      {inList ? <Check size={16} /> : <Scale size={16} className="text-muted" />}
    </button>
  )
}
