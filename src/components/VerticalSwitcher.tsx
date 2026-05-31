'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { verticals } from '@/data/verticals'
import { cn } from '@/lib/cn'
import { DynIcon } from '@/components/ui/Icon'

/** Horizontal pill row to jump between the four verticals. */
export function VerticalSwitcher({ className }: { className?: string }) {
  const pathname = usePathname()
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {verticals.map((v) => {
        const active = pathname === v.href || pathname.startsWith(v.href + '/') || (v.slug === 'shop' && (pathname.startsWith('/product') || pathname.startsWith('/category')))
        return (
          <Link
            key={v.slug}
            href={v.href}
            className={cn(
              'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors',
              active ? 'border-transparent text-white shadow-card' : 'border-line bg-surface text-muted hover:text-ink',
            )}
            style={active ? { backgroundImage: `linear-gradient(135deg, ${v.from}, ${v.to})` } : undefined}
          >
            <DynIcon name={v.icon} size={15} />
            {v.short}
          </Link>
        )
      })}
    </div>
  )
}
