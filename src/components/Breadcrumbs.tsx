import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 overflow-x-auto py-3 text-sm text-muted no-scrollbar">
      <Link href="/" className="inline-flex shrink-0 items-center gap-1 hover:text-brand">
        <Home size={14} /> Home
      </Link>
      {items.map((c, i) => (
        <span key={i} className="inline-flex shrink-0 items-center gap-1">
          <ChevronRight size={14} className="text-faint" />
          {c.href ? (
            <Link href={c.href} className="whitespace-nowrap hover:text-brand">
              {c.label}
            </Link>
          ) : (
            <span className="whitespace-nowrap font-medium text-ink">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
