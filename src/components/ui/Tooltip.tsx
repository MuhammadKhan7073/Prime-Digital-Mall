'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/cn'

/**
 * Subtle guidance tooltip. Shows on hover/focus (desktop) and on press-and-hold
 * (mobile) — matching the brief's "hold a button to get more info".
 */
export function Tooltip({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const holdStart = () => {
    timer.current = setTimeout(() => setOpen(true), 320)
  }
  const holdEnd = () => {
    clearTimeout(timer.current)
    setOpen(false)
  }

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onTouchStart={holdStart}
      onTouchEnd={holdEnd}
      onTouchCancel={holdEnd}
    >
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-xs font-medium text-bg shadow-pop transition-all duration-150',
          open ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
        )}
      >
        {label}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-ink" />
      </span>
    </span>
  )
}
