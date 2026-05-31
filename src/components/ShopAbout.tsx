'use client'

import { useState } from 'react'
import { ChevronDown, BookOpen, Award, Sparkles, ScrollText, Link as LinkIcon, Calendar } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { ShopAbout as ShopAboutData } from '@/data/types'

/**
 * Progressive disclosure: a quiet, collapsed "About this shop" panel shown
 * *below* the products. Deliberately de-emphasized (muted, text-link trigger,
 * collapsed by default) so it never competes with the buy flow — but rewards
 * anyone who chooses to explore the shop's story, certs and policies.
 */
export function ShopAbout({ name, about }: { name: string; about?: ShopAboutData }) {
  const [open, setOpen] = useState(false)
  if (!about) return null
  const has = about.story || about.certifications?.length || about.highlights?.length || about.policies?.length || about.links?.length
  if (!has) return null

  return (
    <section className="container-app mt-8">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 text-left transition-colors hover:bg-elevated"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-muted">
          <BookOpen size={16} className="text-faint" /> About {name}
          <span className="text-xs font-normal text-faint">— story, certifications & policies</span>
        </span>
        <ChevronDown size={18} className={cn('text-faint transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="mt-3 grid gap-4 rounded-2xl border border-line bg-surface p-5 animate-slide-up md:grid-cols-2">
          {about.story && (
            <div className="md:col-span-2">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-faint"><BookOpen size={13} /> Our story</p>
              <p className="text-sm leading-relaxed text-muted">{about.story}</p>
              {about.established && <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-faint"><Calendar size={12} /> Established {about.established}</p>}
            </div>
          )}

          {about.highlights?.length ? (
            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-faint"><Sparkles size={13} /> Highlights</p>
              <ul className="space-y-1">
                {about.highlights.map((h) => <li key={h} className="text-sm text-muted">• {h}</li>)}
              </ul>
            </div>
          ) : null}

          {about.certifications?.length ? (
            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-faint"><Award size={13} /> Certifications</p>
              <div className="flex flex-wrap gap-1.5">
                {about.certifications.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1 rounded-full border border-line bg-elevated px-2.5 py-1 text-xs font-medium text-muted">
                    <Award size={12} className="text-brand" /> {c}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {about.policies?.length ? (
            <div className="md:col-span-2">
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-faint"><ScrollText size={13} /> Policies</p>
              <dl className="overflow-hidden rounded-xl border border-line">
                {about.policies.map((p, i) => (
                  <div key={p.label} className={cn('flex flex-col gap-0.5 px-4 py-2.5 text-sm sm:flex-row sm:gap-4', i % 2 ? 'bg-surface' : 'bg-elevated')}>
                    <dt className="font-medium text-ink sm:w-32 sm:shrink-0">{p.label}</dt>
                    <dd className="text-muted">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          {about.links?.length ? (
            <div className="md:col-span-2 flex flex-wrap gap-3">
              {about.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline">
                  <LinkIcon size={12} /> {l.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </section>
  )
}
