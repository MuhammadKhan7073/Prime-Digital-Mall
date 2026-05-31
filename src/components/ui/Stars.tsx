import { Star } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatCompact } from '@/lib/format'

export function Stars({
  rating,
  count,
  size = 14,
  className,
  showValue = false,
}: {
  rating: number
  count?: number
  size?: number
  className?: string
  showValue?: boolean
}) {
  const rounded = Math.round(rating)
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < rounded ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-line'}
          />
        ))}
      </div>
      {showValue && <span className="text-xs font-semibold text-ink tabular">{rating.toFixed(1)}</span>}
      {count != null && <span className="text-xs text-faint tabular">({formatCompact(count)})</span>}
    </div>
  )
}
