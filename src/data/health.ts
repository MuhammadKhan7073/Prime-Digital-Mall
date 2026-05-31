/** Health vertical — clinics, doctors, labs, pharmacy. Fees in whole PKR. */

export interface Specialty {
  slug: string
  name: string
  emoji: string
  blurb: string
}

export interface Clinic {
  slug: string
  name: string
  city: string
  area: string
  rating: number
  ratingCount: number
  verified: boolean
  tagline: string
  emoji: string
  from: string
  to: string
  phone: string
  /** service kinds offered */
  kinds: ('clinic' | 'lab' | 'pharmacy')[]
  hours: string
  badges: string[]
}

export interface Doctor {
  slug: string
  name: string
  clinic: string
  specialty: string
  /** consultation fee */
  price: number
  emoji: string
  from: string
  to: string
  rating: number
  reviewCount: number
  experienceYears: number
  qualifications: string
  shortDesc: string
  /** available appointment modes */
  modes: ('in-person' | 'video' | 'home')[]
  /** demo slot labels for today/tomorrow */
  nextSlots: string[]
  languages: string[]
}

export const specialties: Specialty[] = [
  { slug: 'gp', name: 'General Physician', emoji: '🩺', blurb: 'Fever, flu, checkups' },
  { slug: 'dentist', name: 'Dentist', emoji: '🦷', blurb: 'Teeth & gum care' },
  { slug: 'dermatology', name: 'Skin & Hair', emoji: '🧴', blurb: 'Dermatology' },
  { slug: 'pediatrics', name: 'Child Specialist', emoji: '🧒', blurb: 'Pediatrics' },
  { slug: 'gynecology', name: 'Gynecology', emoji: '🤰', blurb: 'Women’s health' },
  { slug: 'cardiology', name: 'Heart', emoji: '❤️', blurb: 'Cardiology' },
  { slug: 'psychology', name: 'Mental Health', emoji: '🧠', blurb: 'Therapy & counseling' },
  { slug: 'lab', name: 'Lab Tests', emoji: '🧪', blurb: 'Sample at home' },
]

export const clinics: Clinic[] = [
  { slug: 'shifa-care-clinic', name: 'Shifa Care Clinic', city: 'lahore', area: 'Johar Town', rating: 4.8, ratingCount: 2200, verified: true, tagline: 'Family healthcare, 7 days a week', emoji: '🏥', from: '#0369a1', to: '#22d3ee', phone: '03001234500', kinds: ['clinic', 'lab'], hours: '9 AM – 11 PM', badges: ['Verified', 'PMC Registered'] },
  { slug: 'smile-dental-studio', name: 'Smile Dental Studio', city: 'lahore', area: 'DHA', rating: 4.9, ratingCount: 1400, verified: true, tagline: 'Painless modern dentistry', emoji: '🦷', from: '#0891b2', to: '#34d399', phone: '03001234501', kinds: ['clinic'], hours: '11 AM – 9 PM', badges: ['Verified'] },
  { slug: 'glow-skin-clinic', name: 'Glow Skin Clinic', city: 'karachi', area: 'Clifton', rating: 4.7, ratingCount: 1850, verified: true, tagline: 'Dermatology & aesthetics', emoji: '🧴', from: '#0e7490', to: '#a855f7', phone: '03001234502', kinds: ['clinic'], hours: '12 PM – 10 PM', badges: ['Verified'] },
  { slug: 'little-stars-childcare', name: 'Little Stars Childcare', city: 'islamabad', area: 'F-8', rating: 4.8, ratingCount: 990, verified: true, tagline: 'Caring for your little ones', emoji: '🧸', from: '#2563eb', to: '#22d3ee', phone: '03001234503', kinds: ['clinic'], hours: '10 AM – 8 PM', badges: ['Verified'] },
  { slug: 'heartwell-cardiac', name: 'HeartWell Cardiac Center', city: 'lahore', area: 'Gulberg', rating: 4.9, ratingCount: 760, verified: true, tagline: 'Comprehensive heart care', emoji: '❤️', from: '#be123c', to: '#0369a1', phone: '03001234504', kinds: ['clinic', 'lab'], hours: '9 AM – 6 PM', badges: ['Verified', 'PMC Registered'] },
  { slug: 'calm-minds-therapy', name: 'Calm Minds Therapy', city: 'karachi', area: 'PECHS', rating: 4.8, ratingCount: 540, verified: true, tagline: 'Confidential mental wellness', emoji: '🧠', from: '#7c3aed', to: '#22d3ee', phone: '03001234505', kinds: ['clinic'], hours: '11 AM – 9 PM', badges: ['Verified'] },
  { slug: 'prime-diagnostics-lab', name: 'Prime Diagnostics Lab', city: 'islamabad', area: 'Blue Area', rating: 4.6, ratingCount: 3100, verified: true, tagline: 'Home sampling across the city', emoji: '🧪', from: '#0369a1', to: '#16a34a', phone: '03001234506', kinds: ['lab', 'pharmacy'], hours: '7 AM – 11 PM', badges: ['Verified', 'Home Sampling'] },
]

type DocSeed = Omit<Doctor, 'emoji' | 'from' | 'to' | 'rating' | 'reviewCount' | 'modes' | 'nextSlots' | 'languages'> &
  Partial<Pick<Doctor, 'emoji' | 'from' | 'to' | 'rating' | 'reviewCount' | 'modes' | 'nextSlots' | 'languages'>>

function doc(s: DocSeed): Doctor {
  return {
    emoji: '🩺', from: '#0369a1', to: '#22d3ee', rating: 4.7, reviewCount: 180,
    modes: ['in-person', 'video'], nextSlots: ['Today 5:30 PM', 'Today 7:00 PM', 'Tomorrow 11:00 AM'],
    languages: ['Urdu', 'English'],
    ...s,
  }
}

export const doctors: Doctor[] = [
  doc({ slug: 'dr-ayesha-khan', name: 'Dr. Ayesha Khan', clinic: 'shifa-care-clinic', specialty: 'gp', price: 1500, emoji: '🩺', rating: 4.9, reviewCount: 640, experienceYears: 12, qualifications: 'MBBS, FCPS (Medicine)', shortDesc: 'General physician for fever, flu, diabetes & routine checkups.', modes: ['in-person', 'video', 'home'] }),
  doc({ slug: 'dr-bilal-ahmed', name: 'Dr. Bilal Ahmed', clinic: 'shifa-care-clinic', specialty: 'gp', price: 1200, rating: 4.7, reviewCount: 410, experienceYears: 8, qualifications: 'MBBS', shortDesc: 'Family medicine, walk-ins welcome.' }),
  doc({ slug: 'dr-sara-malik', name: 'Dr. Sara Malik', clinic: 'smile-dental-studio', specialty: 'dentist', price: 2000, emoji: '🦷', from: '#0891b2', to: '#34d399', rating: 4.9, reviewCount: 520, experienceYears: 10, qualifications: 'BDS, RDS', shortDesc: 'Scaling, fillings, root canal & whitening.', modes: ['in-person'] }),
  doc({ slug: 'dr-hina-raza', name: 'Dr. Hina Raza', clinic: 'glow-skin-clinic', specialty: 'dermatology', price: 2500, emoji: '🧴', from: '#0e7490', to: '#a855f7', rating: 4.8, reviewCount: 730, experienceYears: 9, qualifications: 'MBBS, MCPS (Dermatology)', shortDesc: 'Acne, pigmentation, hair fall & laser.', modes: ['in-person', 'video'] }),
  doc({ slug: 'dr-omar-farooq', name: 'Dr. Omar Farooq', clinic: 'little-stars-childcare', specialty: 'pediatrics', price: 1800, emoji: '🧒', from: '#2563eb', to: '#22d3ee', rating: 4.9, reviewCount: 480, experienceYears: 14, qualifications: 'MBBS, FCPS (Pediatrics)', shortDesc: 'Newborn care, vaccinations & child illness.', modes: ['in-person', 'video', 'home'] }),
  doc({ slug: 'dr-nadia-sheikh', name: 'Dr. Nadia Sheikh', clinic: 'heartwell-cardiac', specialty: 'gynecology', price: 2200, emoji: '🤰', from: '#be123c', to: '#a855f7', rating: 4.8, reviewCount: 390, experienceYears: 15, qualifications: 'MBBS, FCPS (Gynae)', shortDesc: 'Pregnancy care, women’s health & ultrasound.', modes: ['in-person'] }),
  doc({ slug: 'dr-imran-shah', name: 'Dr. Imran Shah', clinic: 'heartwell-cardiac', specialty: 'cardiology', price: 3000, emoji: '❤️', from: '#be123c', to: '#0369a1', rating: 4.9, reviewCount: 560, experienceYears: 20, qualifications: 'MBBS, FCPS (Cardiology)', shortDesc: 'ECG, ECHO, blood pressure & heart care.', modes: ['in-person', 'video'] }),
  doc({ slug: 'dr-zara-iqbal', name: 'Dr. Zara Iqbal', clinic: 'calm-minds-therapy', specialty: 'psychology', price: 2500, emoji: '🧠', from: '#7c3aed', to: '#22d3ee', rating: 4.8, reviewCount: 300, experienceYears: 11, qualifications: 'MS Clinical Psychology', shortDesc: 'Anxiety, depression & relationship counseling.', modes: ['video', 'in-person'] }),
]
