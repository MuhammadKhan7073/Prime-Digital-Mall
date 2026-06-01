'use client'

import { Star, BadgeCheck, ThumbsUp } from 'lucide-react'
import { getProduct, ratingBreakdown, reviewsFor } from '@/lib/catalog'
import { useHydrated } from '@/lib/useHydrated'
import { useUserReviews } from '@/store/userReviews'
import { Stars } from '@/components/ui/Stars'
import { ReviewForm } from '@/components/ReviewForm'

const AVATARS = ['#0f6350', '#b77c1c', '#0369a1', '#6d28d9', '#c2410c', '#db2777']

export function Reviews({ slug }: { slug: string }) {
  const product = getProduct(slug)
  const hydrated = useHydrated()
  const seed = reviewsFor(slug)
  const mine = useUserReviews((s) => (hydrated ? s.reviews.filter((r) => r.productSlug === slug) : []))
  if (!product) return null

  const breakdown = ratingBreakdown(slug)
  // fold user reviews into the breakdown
  for (const r of mine) breakdown[r.rating] = (breakdown[r.rating] ?? 0) + 1
  const total = seed.length + mine.length || 1

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr]">
      {/* summary */}
      <div className="h-fit space-y-4">
        <div className="card p-5 text-center">
          <p className="text-4xl font-extrabold text-ink">{product.rating.toFixed(1)}</p>
          <Stars rating={product.rating} className="mt-1 justify-center" size={16} />
          <p className="mt-1 text-sm text-muted">{(product.reviewCount + mine.length).toLocaleString()} ratings</p>
          <div className="mt-4 space-y-1.5">
            {[5, 4, 3, 2, 1].map((s) => (
              <div key={s} className="flex items-center gap-2 text-xs">
                <span className="flex w-6 items-center gap-0.5 text-muted">{s}<Star size={10} className="fill-amber-400 text-amber-400" /></span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${(breakdown[s] / total) * 100}%` }} />
                </div>
                <span className="w-6 text-right text-faint tabular">{breakdown[s]}</span>
              </div>
            ))}
          </div>
        </div>
        <ReviewForm slug={slug} />
      </div>

      {/* list */}
      <div className="space-y-4">
        {/* user reviews first */}
        {mine.map((r, i) => (
          <div key={r.id} className="card border-brand/30 p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: AVATARS[i % AVATARS.length] }}>{r.author.charAt(0).toUpperCase()}</span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">{r.author}
                  <span className="inline-flex items-center gap-0.5 rounded bg-brand-soft px-1.5 py-0.5 text-[10px] font-medium text-brand">You</span>
                </p>
                <Stars rating={r.rating} size={12} />
              </div>
              <span className="text-xs text-faint">just now</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">{r.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{r.body}</p>
          </div>
        ))}

        {seed.map((r) => (
          <div key={r.id} className="card p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: r.avatarColor }}>{r.author.charAt(0)}</span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">{r.author}
                  {r.verified && <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-success"><BadgeCheck size={12} /> Verified</span>}
                </p>
                <Stars rating={r.rating} size={12} />
              </div>
              <span className="text-xs text-faint">{r.date}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">{r.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{r.body}</p>
            <button className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-faint hover:text-brand">
              <ThumbsUp size={12} /> Helpful ({r.helpful})
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
