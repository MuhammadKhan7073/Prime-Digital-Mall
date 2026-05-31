import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BadgeCheck, Briefcase, Languages, MapPin, Video, Home, Check } from 'lucide-react'
import { allDoctors, clinicOf, getDoctor, specialtyName } from '@/lib/health'
import { getCity } from '@/lib/catalog'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductImage } from '@/components/ui/ProductImage'
import { Stars } from '@/components/ui/Stars'
import { BookingForm } from '@/components/BookingForm'
import { PhysicianJsonLd } from '@/components/JsonLd'

export function generateStaticParams() {
  return allDoctors.map((d) => ({ slug: d.slug }))
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = getDoctor(params.slug)
  return { title: d ? d.name : 'Doctor', description: d?.shortDesc }
}

const MODE_ICON: Record<string, typeof Video> = { video: Video, home: Home, 'in-person': MapPin }

export default function DoctorPage({ params }: { params: { slug: string } }) {
  const d = getDoctor(params.slug)
  if (!d) notFound()
  const clinic = clinicOf(d)
  const city = clinic ? getCity(clinic.city) : undefined

  return (
    <div className="container-app">
      <PhysicianJsonLd name={d.name} specialty={specialtyName(d.specialty)} rating={d.rating} reviewCount={d.reviewCount} clinic={clinic?.name} city={city?.name} url={`/health/doctor/${d.slug}`} />
      <Breadcrumbs items={[{ label: 'Health', href: '/health' }, { label: specialtyName(d.specialty), href: `/health/specialty/${d.specialty}` }, { label: d.name }]} />

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="card flex flex-col gap-4 p-5 sm:flex-row">
            <ProductImage from={d.from} to={d.to} emoji={d.emoji} className="h-28 w-28 shrink-0 rounded-2xl" emojiClassName="text-5xl" />
            <div className="flex-1">
              <h1 className="flex items-center gap-1.5 font-display text-2xl font-bold text-ink">{d.name}<BadgeCheck size={18} className="text-brand" /></h1>
              <p className="font-medium text-brand">{specialtyName(d.specialty)}</p>
              <p className="mt-0.5 text-sm text-muted">{d.qualifications}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                <Stars rating={d.rating} count={d.reviewCount} showValue />
                <span className="inline-flex items-center gap-1"><Briefcase size={13} /> {d.experienceYears} yrs experience</span>
                <span className="inline-flex items-center gap-1"><Languages size={13} /> {d.languages.join(', ')}</span>
              </div>
              {clinic && (
                <Link href={`/health/${clinic.slug}`} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-brand">
                  <MapPin size={14} className="text-brand" /> {clinic.name}{city ? `, ${city.name}` : ''}
                </Link>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {d.modes.map((m) => { const Icon = MODE_ICON[m] ?? MapPin; return (
                  <span key={m} className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold capitalize text-brand"><Icon size={13} /> {m}</span>
                )})}
              </div>
            </div>
          </div>

          <div className="card mt-4 p-5">
            <h2 className="mb-2 font-bold text-ink">About</h2>
            <p className="text-sm leading-relaxed text-muted">{d.shortDesc}</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {['Verified profile', 'Confidential consultation', 'e-Prescription on request', 'Pay at clinic / online'].map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-muted"><Check size={15} className="text-success" /> {h}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <BookingForm
            type="doctor"
            slug={d.slug}
            providerSlug={clinic?.slug ?? ''}
            title={d.name}
            subtitle={`${specialtyName(d.specialty)}${clinic ? ` · ${clinic.name}` : ''}`}
            emoji={d.emoji}
            price={d.price}
            slots={d.nextSlots}
            modes={d.modes}
            needsAddress={false}
            waPhone={clinic?.phone}
          />
        </aside>
      </div>
    </div>
  )
}
