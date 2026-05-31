import Link from 'next/link'
import { BadgeCheck, MapPin, Clock } from 'lucide-react'
import type { Clinic } from '@/data/health'
import { doctorsOf } from '@/lib/health'
import { getCity } from '@/lib/catalog'
import { ProductImage } from '@/components/ui/ProductImage'
import { Stars } from '@/components/ui/Stars'

const KIND_LABEL: Record<string, string> = { clinic: 'Clinic', lab: 'Lab', pharmacy: 'Pharmacy' }

export function ClinicCard({ clinic: c }: { clinic: Clinic }) {
  const city = getCity(c.city)
  const docs = doctorsOf(c.slug).length
  return (
    <Link data-entity={`health:business:${c.slug}`} href={`/health/${c.slug}`} className="group card relative flex flex-col overflow-hidden transition-shadow hover:shadow-pop">
      <div className="flex h-20 items-center justify-end px-4" style={{ backgroundImage: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>
        <span className="text-4xl opacity-90 drop-shadow">{c.emoji}</span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="flex items-center gap-1">
          <h3 className="truncate font-bold text-ink group-hover:text-brand">{c.name}</h3>
          {c.verified && <BadgeCheck size={15} className="shrink-0 text-brand" />}
        </div>
        <p className="line-clamp-1 text-xs text-muted">{c.tagline}</p>
        <Stars rating={c.rating} count={c.ratingCount} showValue />
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-faint">
          <span className="inline-flex items-center gap-1"><MapPin size={11} /> {c.area}, {city?.name}</span>
          <span className="inline-flex items-center gap-1"><Clock size={11} /> {c.hours}</span>
        </div>
        <div className="mt-1 flex flex-wrap gap-1">
          {c.kinds.map((k) => (
            <span key={k} className="rounded-md bg-brand-soft px-1.5 py-0.5 text-[10px] font-semibold text-brand">{KIND_LABEL[k]}</span>
          ))}
          {docs > 0 && <span className="rounded-md bg-elevated px-1.5 py-0.5 text-[10px] font-semibold text-muted">{docs} doctors</span>}
        </div>
      </div>
    </Link>
  )
}
