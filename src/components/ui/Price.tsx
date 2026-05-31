import { cn } from '@/lib/cn'
import { formatPrice, percentOff } from '@/lib/format'

export function Price({
  price,
  compareAt,
  size = 'md',
  className,
}: {
  price: number
  compareAt?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const off = percentOff(price, compareAt)
  const main = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-base'
  return (
    <div className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-0.5', className)}>
      <span className={cn('font-extrabold text-ink tabular', main)}>{formatPrice(price)}</span>
      {off > 0 && (
        <>
          <span className="text-xs text-faint line-through tabular">{formatPrice(compareAt!)}</span>
          <span className="text-xs font-bold text-deal">-{off}%</span>
        </>
      )}
    </div>
  )
}
