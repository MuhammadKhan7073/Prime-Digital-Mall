import Link from 'next/link'
import { Video, Home, MapPin, Briefcase } from 'lucide-react'
import type { Doctor } from '@/data/health'
import { clinicOf, specialtyName } from '@/lib/health'
import { formatPrice } from '@/lib/format'
import { ProductImage } from '@/components/ui/ProductImage'
import { Stars } from '@/components/ui/Stars'

export function DoctorCard({ doctor: d }: { doctor: Doctor }) {
  const clinic = clinicOf(d)
  return (
    <Link href={`/health/doctor/${d.slug}`} className="group card flex gap-3 p-3 transition-shadow hover:shadow-pop">
      <ProductImage from={d.from} to={d.to} emoji={d.emoji} className="h-20 w-20 shrink-0 rounded-xl" emojiClassName="text-3xl" />
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="truncate font-bold text-ink group-hover:text-brand">{d.name}</h3>
        <p className="text-xs font-medium text-brand">{specialtyName(d.specialty)}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted">{d.qualifications}</p>
        <div className="mt-1 flex items-center gap-2">
          <Stars rating={d.rating} count={d.reviewCount} size={12} />
          <span className="inline-flex items-center gap-0.5 text-[11px] text-faint"><Briefcase size={11} /> {d.experienceYears}y</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-sm font-bold text-ink tabular">{formatPrice(d.price)}</span>
          <span className="flex items-center gap-1 text-faint">
            {d.modes.includes('video') && <Video size={13} />}
            {d.modes.includes('home') && <Home size={13} />}
            {d.modes.includes('in-person') && <MapPin size={13} />}
          </span>
        </div>
      </div>
    </Link>
  )
}
