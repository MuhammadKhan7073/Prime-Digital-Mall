import Link from 'next/link'
import { BadgeCheck, CheckCircle2, Zap } from 'lucide-react'
import type { Provider } from '@/data/services'
import { categoryName } from '@/lib/services'
import { formatCompact } from '@/lib/format'
import { ProductImage } from '@/components/ui/ProductImage'
import { Stars } from '@/components/ui/Stars'

export function ProviderCard({ provider: p }: { provider: Provider }) {
  return (
    <Link data-entity={`services:business:${p.slug}`} href={`/services/provider/${p.slug}`} className="group card relative flex flex-col overflow-hidden transition-shadow hover:shadow-pop">
      <div className="flex h-20 items-center justify-end px-4" style={{ backgroundImage: `linear-gradient(135deg, ${p.from}, ${p.to})` }}>
        <span className="text-4xl opacity-90 drop-shadow">{p.emoji}</span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="flex items-center gap-1">
          <h3 className="truncate font-bold text-ink group-hover:text-brand">{p.name}</h3>
          {p.verified && <BadgeCheck size={15} className="shrink-0 text-brand" />}
        </div>
        <p className="text-xs font-medium text-brand">{categoryName(p.category)}</p>
        <Stars rating={p.rating} count={p.ratingCount} showValue />
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-faint">
          <span className="inline-flex items-center gap-1"><CheckCircle2 size={11} className="text-success" /> {formatCompact(p.jobsDone)} jobs done</span>
          <span className="inline-flex items-center gap-1"><Zap size={11} className="text-accent" /> {p.responseLabel}</span>
        </div>
      </div>
    </Link>
  )
}
