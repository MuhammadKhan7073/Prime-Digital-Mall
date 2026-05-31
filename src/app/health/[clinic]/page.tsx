import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BadgeCheck, MapPin, Clock, MessageCircle } from 'lucide-react'
import { allClinics, doctorsOf, getClinic } from '@/lib/health'
import { allSpecialties } from '@/lib/health'
import { getCity } from '@/lib/catalog'
import { waLink } from '@/lib/whatsapp'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Stars } from '@/components/ui/Stars'
import { DoctorCard } from '@/components/DoctorCard'

// Avoid clashing with /health/specialty and /health/doctor static segments.
export function generateStaticParams() {
  const reserved = new Set(['specialty', 'doctor'])
  return allClinics.filter((c) => !reserved.has(c.slug)).map((c) => ({ clinic: c.slug }))
}
export function generateMetadata({ params }: { params: { clinic: string } }): Metadata {
  const c = getClinic(params.clinic)
  return { title: c ? c.name : 'Clinic', description: c?.tagline }
}

const KIND_LABEL: Record<string, string> = { clinic: 'Clinic', lab: 'Lab', pharmacy: 'Pharmacy' }

export default function ClinicPage({ params }: { params: { clinic: string } }) {
  const c = getClinic(params.clinic)
  if (!c) notFound()
  const doctors = doctorsOf(c.slug)
  const city = getCity(c.city)

  return (
    <div className="flex flex-col gap-6">
      <div className="container-app">
        <Breadcrumbs items={[{ label: 'Health', href: '/health' }, { label: c.name }]} />
        <div className="overflow-hidden rounded-3xl border border-line">
          <div className="h-28 sm:h-36" style={{ backgroundImage: `linear-gradient(135deg, ${c.from}, ${c.to})` }} />
          <div className="flex flex-col gap-4 bg-surface p-4 sm:flex-row sm:items-end sm:p-6">
            <div className="-mt-16 grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-4 border-surface bg-elevated text-4xl shadow-card">{c.emoji}</div>
            <div className="flex-1">
              <h1 className="flex items-center gap-1.5 font-display text-2xl font-bold text-ink">{c.name}{c.verified && <BadgeCheck size={20} className="text-brand" />}</h1>
              <p className="text-sm text-muted">{c.tagline}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                <Stars rating={c.rating} count={c.ratingCount} showValue />
                <span className="inline-flex items-center gap-1"><MapPin size={13} /> {c.area}, {city?.name}</span>
                <span className="inline-flex items-center gap-1"><Clock size={13} /> {c.hours}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {c.kinds.map((k) => <span key={k} className="rounded-md bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">{KIND_LABEL[k]}</span>)}
              </div>
            </div>
            <a href={waLink(c.phone, `Assalam o Alaikum ${c.name}! I have a question (via Prime Digital Mall).`)} target="_blank" rel="noreferrer" className="btn-wa btn-md shrink-0"><MessageCircle size={17} /> Contact</a>
          </div>
        </div>
      </div>

      <div className="container-app">
        <h2 className="mb-3 font-display text-xl font-bold text-ink">{doctors.length ? 'Doctors at this clinic' : 'Services'}</h2>
        {doctors.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{doctors.map((d) => <DoctorCard key={d.slug} doctor={d} />)}</div>
        ) : (
          <div className="card p-6 text-sm text-muted">
            This facility offers {c.kinds.map((k) => KIND_LABEL[k]).join(', ')} services. Contact on WhatsApp to book a test or order.
          </div>
        )}
      </div>
    </div>
  )
}
