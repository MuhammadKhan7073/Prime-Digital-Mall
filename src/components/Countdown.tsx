'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

/** Counts down to the end of the current day. Client-only to avoid hydration drift. */
export function Countdown({ className }: { className?: string }) {
  const [left, setLeft] = useState<number | null>(null)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const end = new Date(now)
      end.setHours(23, 59, 59, 999)
      setLeft(Math.max(0, end.getTime() - now.getTime()))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (left == null) return <span className={cn('inline-flex gap-1', className)} aria-hidden />

  const h = Math.floor(left / 3.6e6)
  const m = Math.floor((left % 3.6e6) / 6e4)
  const s = Math.floor((left % 6e4) / 1000)

  return (
    <span className={cn('inline-flex items-center gap-1 tabular', className)}>
      {[h, m, s].map((v, i) => (
        <span key={i} className="rounded-md bg-ink px-1.5 py-0.5 text-xs font-bold text-bg">
          {pad(v)}
        </span>
      ))}
    </span>
  )
}
