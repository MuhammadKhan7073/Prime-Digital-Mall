'use client'

import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/cn'

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: {
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
  className?: string
}) {
  return (
    <div className={cn('inline-flex items-center rounded-xl border border-line bg-surface', className)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="grid h-10 w-10 place-items-center text-muted transition-colors hover:text-ink disabled:opacity-40"
      >
        <Minus size={16} />
      </button>
      <span className="w-8 select-none text-center text-sm font-bold tabular">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="grid h-10 w-10 place-items-center text-muted transition-colors hover:text-ink disabled:opacity-40"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
