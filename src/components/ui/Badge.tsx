import { cn } from '@/lib/cn'

type Variant = 'sale' | 'new' | 'bestseller' | 'trending' | 'editor' | 'flash' | 'low' | 'out' | 'ship' | 'neutral' | 'verified'

const STYLES: Record<Variant, string> = {
  sale: 'bg-deal text-white',
  flash: 'bg-deal text-white',
  new: 'bg-success text-white',
  bestseller: 'bg-amber-500 text-white',
  trending: 'bg-brand text-brand-fg',
  editor: 'bg-violet-600 text-white',
  low: 'bg-warn text-white',
  out: 'bg-faint text-white',
  ship: 'bg-brand-soft text-brand',
  verified: 'bg-brand-soft text-brand',
  neutral: 'border border-line bg-surface text-muted',
}

const LABELS: Partial<Record<Variant, string>> = {
  new: 'NEW',
  bestseller: 'BESTSELLER',
  trending: 'TRENDING',
  editor: "EDITOR'S PICK",
  flash: 'FLASH',
  low: 'ALMOST GONE',
  out: 'SOLD OUT',
}

export function Badge({
  variant = 'neutral',
  children,
  className,
}: {
  variant?: Variant
  children?: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide',
        STYLES[variant],
        className,
      )}
    >
      {children ?? LABELS[variant] ?? variant}
    </span>
  )
}
