import type { Metadata } from 'next'
import Link from 'next/link'
import { Stethoscope, Video, Home, FlaskConical } from 'lucide-react'
import { allSpecialties, topDoctors, clinicsInCity } from '@/lib/health'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Section } from '@/components/Section'
import { HScroll } from '@/components/HScroll'
import { DoctorCard } from '@/components/DoctorCard'
import { ClinicCard } from '@/components/ClinicCard'

export const metadata: Metadata = { title: 'Health — Doctors, Clinics & Labs', description: 'Book verified doctors, clinics, lab tests and home visits across Pakistan.' }

export default function HealthHome() {
  const doctors = topDoctors(8)
  const clinics = clinicsInCity(null).slice(0, 8)

  return (
    <div className="flex flex-col gap-8">
      <div className="container-app">
        <Breadcrumbs items={[{ label: 'Health' }]} />
        <div className="overflow-hidden rounded-3xl p-6 text-white sm:p-8" style={{ backgroundImage: 'linear-gradient(135deg, #0369a1, #22d3ee)' }}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur"><Stethoscope size={13} /> HEALTHCARE</span>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Care, when you need it</h1>
          <p className="mt-1 text-white/90">Book verified doctors, clinics & lab tests — in person, video, or at home.</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur"><Video size={13} /> Video consult</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur"><Home size={13} /> Home visit</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur"><FlaskConical size={13} /> Lab at home</span>
          </div>
        </div>
      </div>

      <section className="container-app">
        <HScroll>
          {allSpecialties.map((s) => (
            <Link key={s.slug} href={`/health/specialty/${s.slug}`} className="group flex w-[96px] shrink-0 snap-start flex-col items-center gap-2">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-elevated text-3xl shadow-card transition-transform group-hover:-translate-y-0.5">{s.emoji}</span>
              <span className="text-center text-xs font-semibold leading-tight text-ink">{s.name}</span>
            </Link>
          ))}
        </HScroll>
      </section>

      <Section title="Top doctors" subtitle="Verified & highly rated" icon={<Stethoscope size={20} className="text-brand" />}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => <DoctorCard key={d.slug} doctor={d} />)}
        </div>
      </Section>

      <Section title="Clinics, labs & pharmacies">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {clinics.map((c) => <ClinicCard key={c.slug} clinic={c} />)}
        </div>
      </Section>
    </div>
  )
}
