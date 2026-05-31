import { cn } from '@/lib/cn'

/**
 * Offline-safe product visual: a soft gradient tile with the product emoji.
 * No network images means nothing ever renders broken.
 */
export function ProductImage({
  from,
  to,
  emoji,
  className,
  emojiClassName,
}: {
  from: string
  to: string
  emoji: string
  className?: string
  emojiClassName?: string
}) {
  return (
    <div
      className={cn('relative flex items-center justify-center overflow-hidden', className)}
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-xl" />
      <div className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-black/10 blur-xl" />
      <span className={cn('relative select-none drop-shadow-sm', emojiClassName ?? 'text-5xl')}>{emoji}</span>
    </div>
  )
}
