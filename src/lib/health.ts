import { clinics, doctors, specialties } from '@/data/health'
import type { Clinic, Doctor, Specialty } from '@/data/health'

export const allClinics = clinics
export const allDoctors = doctors
export const allSpecialties = specialties

export const getClinic = (slug: string): Clinic | undefined => clinics.find((c) => c.slug === slug)
export const getDoctor = (slug: string): Doctor | undefined => doctors.find((d) => d.slug === slug)
export const getSpecialty = (slug: string): Specialty | undefined => specialties.find((s) => s.slug === slug)
export const clinicOf = (d: Doctor): Clinic | undefined => clinics.find((c) => c.slug === d.clinic)

export const doctorsOf = (clinicSlug: string): Doctor[] => doctors.filter((d) => d.clinic === clinicSlug)
export const doctorsBySpecialty = (slug: string): Doctor[] => doctors.filter((d) => d.specialty === slug)

export function topDoctors(limit = 12): Doctor[] {
  return [...doctors].sort((a, b) => b.rating - a.rating).slice(0, limit)
}

export function clinicsInCity(citySlug: string | null): Clinic[] {
  if (!citySlug) return clinics
  const local = clinics.filter((c) => c.city === citySlug)
  return local.length ? local : clinics
}

export function specialtyName(slug: string): string {
  return specialties.find((s) => s.slug === slug)?.name ?? slug
}

export interface DocFilterOpts {
  query?: string
  specialty?: string
  city?: string
  mode?: 'in-person' | 'video' | 'home'
  sort?: 'rating' | 'fee-asc' | 'fee-desc' | 'experience'
}

export function filterDoctors(o: DocFilterOpts): Doctor[] {
  let list = doctors.slice()
  if (o.specialty) list = list.filter((d) => d.specialty === o.specialty)
  if (o.mode) list = list.filter((d) => d.modes.includes(o.mode!))
  if (o.city) {
    const cityClinics = new Set(clinics.filter((c) => c.city === o.city).map((c) => c.slug))
    list = list.filter((d) => cityClinics.has(d.clinic))
  }
  if (o.query?.trim()) {
    const q = o.query.toLowerCase()
    list = list.filter((d) => `${d.name} ${d.shortDesc} ${specialtyName(d.specialty)}`.toLowerCase().includes(q))
  }
  switch (o.sort) {
    case 'fee-asc': list.sort((a, b) => a.price - b.price); break
    case 'fee-desc': list.sort((a, b) => b.price - a.price); break
    case 'experience': list.sort((a, b) => b.experienceYears - a.experienceYears); break
    case 'rating':
    default: list.sort((a, b) => b.rating - a.rating)
  }
  return list
}
