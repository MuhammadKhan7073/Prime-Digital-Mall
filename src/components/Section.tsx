import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

export function Section({
  title,
  subtitle,
  href,
  hrefLabel = 'See all',
  icon,
  children,
  className,
}: {
  title: string
  subtitle?: string
  href?: string
  hrefLabel?: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn('container-app', className)}>
      <div className="mb-3 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink sm:text-xl">
            {icon}
            {title}
          </h2>
          {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
        </div>
        {href && (
          <Link href={href} className="inline-flex shrink-0 items-center gap-0.5 text-sm font-semibold text-brand hover:underline">
            {hrefLabel} <ChevronRight size={16} />
          </Link>
        )}
      </div>
      {children}
    </section>
  )
}
