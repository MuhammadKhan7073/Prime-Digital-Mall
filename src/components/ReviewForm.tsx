'use client'

import { useState } from 'react'
import { Star, PenLine, Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useUserReviews } from '@/store/userReviews'
import { useUI } from '@/store/ui'

/** Lets a customer write a review for a product. Stored locally (demo). */
export function ReviewForm({ slug }: { slug: string }) {
  const add = useUserReviews((s) => s.add)
  const toast = useUI((s) => s.toast)
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const valid = rating > 0 && author.trim() && body.trim().length > 3

  const submit = () => {
    if (!valid) return
    add({ productSlug: slug, author: author.trim(), rating, title: title.trim() || 'Review', body: body.trim() })
    toast('Thanks for your review!', { kind: 'success' })
    setOpen(false); setRating(0); setAuthor(''); setTitle(''); setBody('')
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-ghost btn-md">
        <PenLine size={16} /> Write a review
      </button>
    )
  }

  return (
    <div className="card p-4">
      <h3 className="mb-3 font-bold text-ink">Write your review</h3>
      <div className="mb-3 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)} onClick={() => setRating(i)} aria-label={`${i} stars`}>
            <Star size={26} className={cn('transition-colors', (hover || rating) >= i ? 'fill-amber-400 text-amber-400' : 'text-line')} />
          </button>
        ))}
        {rating > 0 && <span className="ml-2 text-sm font-medium text-muted">{rating}/5</span>}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" className="input" />
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (optional)" className="input" />
      </div>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={3} placeholder="Share your experience…" className="input mt-2 h-auto resize-none py-2.5" />
      <div className="mt-3 flex gap-2">
        <button onClick={submit} disabled={!valid} className="btn-primary btn-md"><Check size={16} /> Submit review</button>
        <button onClick={() => setOpen(false)} className="btn-ghost btn-md">Cancel</button>
      </div>
    </div>
  )
}
