import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allSpecialties, doctorsBySpecialty, getSpecialty } from '@/lib/health'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DoctorCard } from '@/components/DoctorCard'

export function generateStaticParams() {
  return allSpecialties.map((s) => ({ slug: s.slug }))
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getSpecialty(params.slug)
  return { title: s ? s.name : 'Specialty' }
}

export default function SpecialtyPage({ params }: { params: { slug: string } }) {
  const s = getSpecialty(params.slug)
  if (!s) notFound()
  const doctors = doctorsBySpecialty(s.slug)

  return (
    <div className="container-app">
      <Breadcrumbs items={[{ label: 'Health', href: '/health' }, { label: s.name }]} />
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-elevated text-2xl">{s.emoji}</span>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">{s.name}</h1>
          <p className="text-sm text-muted">{s.blurb} · {doctors.length} doctors</p>
        </div>
      </div>
      {doctors.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{doctors.map((d) => <DoctorCard key={d.slug} doctor={d} />)}</div>
      ) : (
        <div className="card p-10 text-center text-muted">No doctors listed yet in this specialty.</div>
      )}
    </div>
  )
}
