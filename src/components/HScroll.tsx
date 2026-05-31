'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { cn } from '@/lib/cn'

/** Horizontal snap scroller with desktop arrow controls. */
export function HScroll({ children, className, itemClassName }: { children: React.ReactNode; className?: string; itemClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.8), behavior: 'smooth' })

  return (
    <div className="group/h relative">
      <div ref={ref} className={cn('no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1', className)}>
        {children}
      </div>
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scroll(-1)}
        className="absolute -left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface shadow-pop transition-opacity hover:bg-elevated md:grid md:opacity-0 md:group-hover/h:opacity-100"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scroll(1)}
        className="absolute -right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface shadow-pop transition-opacity hover:bg-elevated md:grid md:opacity-0 md:group-hover/h:opacity-100"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
