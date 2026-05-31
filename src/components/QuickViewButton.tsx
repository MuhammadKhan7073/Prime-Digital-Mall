'use client'

import { Eye } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useUI } from '@/store/ui'

export function QuickViewButton({ slug, className }: { slug: string; className?: string }) {
  const open = useUI((s) => s.openQuickView)
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        open(slug)
      }}
      className={cn(
        'btn inline-flex h-9 items-center gap-1.5 rounded-full bg-ink/85 px-3 text-xs font-semibold text-bg backdrop-blur hover:bg-ink',
        className,
      )}
    >
      <Eye size={14} /> Quick view
    </button>
  )
}
