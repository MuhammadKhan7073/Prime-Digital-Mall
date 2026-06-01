'use client'

import Link from 'next/link'
import { Scale, X, ArrowRight } from 'lucide-react'
import { getProduct } from '@/lib/catalog'
import { useHydrated } from '@/lib/useHydrated'
import { useCompare } from '@/store/compare'
import { ProductImage } from '@/components/ui/ProductImage'

/** Floating bar listing products queued for comparison. */
export function CompareBar() {
  const hydrated = useHydrated()
  const slugs = useCompare((s) => s.slugs)
  const remove = useCompare((s) => s.remove)
  const clear = useCompare((s) => s.clear)
  if (!hydrated || slugs.length === 0) return null

  return (
    <div className="fixed inset-x-0 bottom-16 z-40 px-3 lg:bottom-4">
      <div className="container-app flex items-center gap-3 rounded-2xl border border-line bg-surface/95 px-3 py-2.5 shadow-pop backdrop-blur">
        <span className="hidden items-center gap-1.5 text-sm font-bold text-ink sm:flex"><Scale size={16} className="text-brand" /> Compare</span>
        <div className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
          {slugs.map((s) => {
            const p = getProduct(s)
            if (!p) return null
            return (
              <div key={s} className="relative shrink-0">
                <ProductImage from={p.from} to={p.to} emoji={p.emoji} className="h-11 w-11 rounded-lg" emojiClassName="text-xl" />
                <button onClick={() => remove(s)} className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-ink text-bg" aria-label="Remove"><X size={11} /></button>
              </div>
            )
          })}
        </div>
        <button onClick={clear} className="hidden text-xs text-faint hover:text-deal sm:block">Clear</button>
        <Link href="/compare" className="btn-primary btn-sm shrink-0">Compare {slugs.length} <ArrowRight size={14} /></Link>
      </div>
    </div>
  )
}
