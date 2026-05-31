/** Services vertical — home & professional services. Prices in whole PKR. */

export interface ServiceCategory {
  slug: string
  name: string
  emoji: string
  icon: string
  blurb: string
  from: string
  to: string
}

export interface Provider {
  slug: string
  name: string
  city: string
  category: string
  rating: number
  ratingCount: number
  verified: boolean
  tagline: string
  emoji: string
  from: string
  to: string
  phone: string
  /** jobs completed */
  jobsDone: number
  responseLabel: string
  badges: string[]
}

export interface Offering {
  slug: string
  name: string
  provider: string
  category: string
  /** starting price */
  price: number
  /** 'fixed' | 'from' | 'hourly' | 'visit' */
  priceType: 'fixed' | 'from' | 'hourly' | 'visit'
  emoji: string
  from: string
  to: string
  rating: number
  reviewCount: number
  durationLabel: string
  shortDesc: string
  popular: boolean
}

export const serviceCategories: ServiceCategory[] = [
  { slug: 'cleaning', name: 'Cleaning', emoji: '🧹', icon: 'Sparkles', blurb: 'Home, sofa & water tank', from: '#6d28d9', to: '#22d3ee' },
  { slug: 'ac-repair', name: 'AC & Appliance', emoji: '❄️', icon: 'AirVent', blurb: 'Service & repair', from: '#0369a1', to: '#22d3ee' },
  { slug: 'plumbing', name: 'Plumbing', emoji: '🔧', icon: 'Wrench', blurb: 'Leaks, taps & drainage', from: '#0e7490', to: '#3b82f6' },
  { slug: 'electrician', name: 'Electrician', emoji: '💡', icon: 'Plug', blurb: 'Wiring & fixtures', from: '#b45309', to: '#f59e0b' },
  { slug: 'beauty', name: 'Salon at Home', emoji: '💅', icon: 'Scissors', blurb: 'Beauty & grooming', from: '#db2777', to: '#a855f7' },
  { slug: 'tutoring', name: 'Tutoring', emoji: '📚', icon: 'GraduationCap', blurb: 'Home & online tutors', from: '#7c3aed', to: '#6366f1' },
  { slug: 'movers', name: 'Movers & Shifting', emoji: '📦', icon: 'Truck', blurb: 'Home & office moving', from: '#92400e', to: '#f59e0b' },
  { slug: 'pest', name: 'Pest Control', emoji: '🐜', icon: 'Bug', blurb: 'Fumigation & termite', from: '#15803d', to: '#84cc16' },
  { slug: 'auto', name: 'Car Care', emoji: '🚗', icon: 'Car', blurb: 'Wash & service at home', from: '#1e293b', to: '#0ea5e9' },
  { slug: 'laundry', name: 'Laundry', emoji: '🧺', icon: 'Shirt', blurb: 'Wash, iron & dry clean', from: '#0891b2', to: '#34d399' },
]

export const providers: Provider[] = [
  { slug: 'sparkle-home-cleaning', name: 'Sparkle Home Cleaning', city: 'lahore', category: 'cleaning', rating: 4.8, ratingCount: 1900, verified: true, tagline: 'Spotless homes, trained staff', emoji: '🧹', from: '#6d28d9', to: '#22d3ee', phone: '03101112233', jobsDone: 5400, responseLabel: 'Within 1 hr', badges: ['Verified', 'Background-checked'] },
  { slug: 'coolair-ac-services', name: 'CoolAir AC Services', city: 'karachi', category: 'ac-repair', rating: 4.7, ratingCount: 2300, verified: true, tagline: 'AC service, gas & repair', emoji: '❄️', from: '#0369a1', to: '#22d3ee', phone: '03102223344', jobsDone: 8100, responseLabel: 'Same day', badges: ['Verified'] },
  { slug: 'fixit-plumbers', name: 'FixIt Plumbers', city: 'lahore', category: 'plumbing', rating: 4.6, ratingCount: 1400, verified: true, tagline: 'Leaks & fittings fixed fast', emoji: '🔧', from: '#0e7490', to: '#3b82f6', phone: '03103334455', jobsDone: 3600, responseLabel: 'Within 2 hrs', badges: ['Verified'] },
  { slug: 'voltpro-electricians', name: 'VoltPro Electricians', city: 'islamabad', category: 'electrician', rating: 4.7, ratingCount: 1100, verified: true, tagline: 'Safe wiring & repairs', emoji: '💡', from: '#b45309', to: '#f59e0b', phone: '03104445566', jobsDone: 2900, responseLabel: 'Same day', badges: ['Verified'] },
  { slug: 'glamour-home-salon', name: 'Glamour Home Salon', city: 'lahore', category: 'beauty', rating: 4.9, ratingCount: 2600, verified: true, tagline: 'Salon experience at home', emoji: '💅', from: '#db2777', to: '#a855f7', phone: '03105556677', jobsDone: 7200, responseLabel: 'Book a slot', badges: ['Verified', 'Top Rated'] },
  { slug: 'bright-minds-tutors', name: 'Bright Minds Tutors', city: 'karachi', category: 'tutoring', rating: 4.8, ratingCount: 880, verified: true, tagline: 'O/A levels & Matric experts', emoji: '📚', from: '#7c3aed', to: '#6366f1', phone: '03106667788', jobsDone: 1500, responseLabel: 'Within a day', badges: ['Verified'] },
  { slug: 'swift-movers', name: 'Swift Movers', city: 'islamabad', category: 'movers', rating: 4.6, ratingCount: 720, verified: true, tagline: 'Careful home & office shifting', emoji: '📦', from: '#92400e', to: '#f59e0b', phone: '03107778899', jobsDone: 1900, responseLabel: 'Free survey', badges: ['Verified'] },
  { slug: 'shield-pest-control', name: 'Shield Pest Control', city: 'lahore', category: 'pest', rating: 4.7, ratingCount: 1050, verified: true, tagline: 'Safe, odorless fumigation', emoji: '🐜', from: '#15803d', to: '#84cc16', phone: '03108889900', jobsDone: 3300, responseLabel: 'Same day', badges: ['Verified'] },
  { slug: 'shinewash-auto', name: 'ShineWash Auto', city: 'karachi', category: 'auto', rating: 4.7, ratingCount: 1600, verified: true, tagline: 'Car wash & detailing at home', emoji: '🚗', from: '#1e293b', to: '#0ea5e9', phone: '03109990011', jobsDone: 4100, responseLabel: 'Within 2 hrs', badges: ['Verified'] },
  { slug: 'freshfold-laundry', name: 'FreshFold Laundry', city: 'rawalpindi', category: 'laundry', rating: 4.6, ratingCount: 940, verified: true, tagline: 'Pickup, wash, iron & deliver', emoji: '🧺', from: '#0891b2', to: '#34d399', phone: '03100001122', jobsDone: 2700, responseLabel: 'Next-day', badges: ['Verified'] },
]

type OfferSeed = Omit<Offering, 'emoji' | 'from' | 'to' | 'rating' | 'reviewCount' | 'popular'> &
  Partial<Pick<Offering, 'emoji' | 'from' | 'to' | 'rating' | 'reviewCount' | 'popular'>>

function offer(s: OfferSeed): Offering {
  return { emoji: '🛠️', from: '#6d28d9', to: '#a855f7', rating: 4.7, reviewCount: 140, popular: false, ...s }
}

export const offerings: Offering[] = [
  // Cleaning
  offer({ slug: 'full-home-deep-clean', name: 'Full Home Deep Clean', provider: 'sparkle-home-cleaning', category: 'cleaning', price: 6500, priceType: 'from', emoji: '🧼', durationLabel: '4–6 hrs', popular: true, rating: 4.8, reviewCount: 720, shortDesc: 'Top-to-bottom clean for the whole house.' }),
  offer({ slug: 'sofa-carpet-clean', name: 'Sofa & Carpet Shampoo', provider: 'sparkle-home-cleaning', category: 'cleaning', price: 3500, priceType: 'from', emoji: '🛋️', durationLabel: '2–3 hrs', rating: 4.7, reviewCount: 410, shortDesc: 'Deep shampoo & stain removal.' }),
  offer({ slug: 'water-tank-clean', name: 'Water Tank Cleaning', provider: 'sparkle-home-cleaning', category: 'cleaning', price: 2500, priceType: 'fixed', emoji: '🚰', durationLabel: '1–2 hrs', shortDesc: 'Drain, scrub & disinfect.' }),
  // AC
  offer({ slug: 'ac-service-split', name: 'AC Service (Split)', provider: 'coolair-ac-services', category: 'ac-repair', price: 1800, priceType: 'fixed', emoji: '❄️', durationLabel: '45 min', popular: true, rating: 4.7, reviewCount: 980, shortDesc: 'Full wash & performance check.' }),
  offer({ slug: 'ac-gas-refill', name: 'AC Gas Refill', provider: 'coolair-ac-services', category: 'ac-repair', price: 4500, priceType: 'from', emoji: '🧊', durationLabel: '1 hr', shortDesc: 'Refill & leak check.' }),
  // Plumbing
  offer({ slug: 'leak-tap-fix', name: 'Leak & Tap Repair', provider: 'fixit-plumbers', category: 'plumbing', price: 800, priceType: 'visit', emoji: '🚿', durationLabel: '30–60 min', popular: true, shortDesc: 'Visit charge; parts extra.' }),
  offer({ slug: 'drain-unclog', name: 'Drain Unclogging', provider: 'fixit-plumbers', category: 'plumbing', price: 1500, priceType: 'from', emoji: '🪠', durationLabel: '1 hr', shortDesc: 'Kitchen & bathroom drains.' }),
  // Electrician
  offer({ slug: 'wiring-fault-fix', name: 'Wiring Fault Repair', provider: 'voltpro-electricians', category: 'electrician', price: 1000, priceType: 'visit', emoji: '⚡', durationLabel: '1 hr', popular: true, shortDesc: 'Diagnose & fix; parts extra.' }),
  offer({ slug: 'fan-light-install', name: 'Fan / Light Installation', provider: 'voltpro-electricians', category: 'electrician', price: 700, priceType: 'fixed', emoji: '💡', durationLabel: '30 min', shortDesc: 'Per fixture installation.' }),
  // Beauty
  offer({ slug: 'bridal-makeup', name: 'Bridal Makeup', provider: 'glamour-home-salon', category: 'beauty', price: 18000, priceType: 'from', emoji: '👰', durationLabel: '2–3 hrs', popular: true, rating: 4.9, reviewCount: 540, shortDesc: 'Premium bridal look at home.' }),
  offer({ slug: 'party-makeup', name: 'Party Makeup', provider: 'glamour-home-salon', category: 'beauty', price: 5000, priceType: 'from', emoji: '💄', durationLabel: '1 hr', shortDesc: 'Glam look for events.' }),
  offer({ slug: 'mani-pedi', name: 'Mani-Pedi Combo', provider: 'glamour-home-salon', category: 'beauty', price: 2500, priceType: 'fixed', emoji: '💅', durationLabel: '1 hr', shortDesc: 'Relaxing hands & feet care.' }),
  // Tutoring
  offer({ slug: 'olevel-math-tuition', name: 'O-Level Maths Tuition', provider: 'bright-minds-tutors', category: 'tutoring', price: 1200, priceType: 'hourly', emoji: '📐', durationLabel: 'per hour', popular: true, shortDesc: 'Experienced tutor, home or online.' }),
  offer({ slug: 'matric-science', name: 'Matric Science (All)', provider: 'bright-minds-tutors', category: 'tutoring', price: 8000, priceType: 'from', emoji: '🔬', durationLabel: 'per month', shortDesc: 'Physics, chem & bio combined.' }),
  // Movers
  offer({ slug: 'home-shifting', name: 'Home Shifting (2-bed)', provider: 'swift-movers', category: 'movers', price: 15000, priceType: 'from', emoji: '🚚', durationLabel: 'half day', popular: true, shortDesc: 'Packing, loading & transport.' }),
  // Pest
  offer({ slug: 'general-fumigation', name: 'General Fumigation', provider: 'shield-pest-control', category: 'pest', price: 4000, priceType: 'from', emoji: '🪳', durationLabel: '1–2 hrs', popular: true, shortDesc: 'Cockroaches, ants & mosquitoes.' }),
  offer({ slug: 'termite-treatment', name: 'Termite Treatment', provider: 'shield-pest-control', category: 'pest', price: 9000, priceType: 'from', emoji: '🐛', durationLabel: '2–3 hrs', shortDesc: 'Targeted anti-termite spray.' }),
  // Auto
  offer({ slug: 'car-wash-home', name: 'Car Wash at Home', provider: 'shinewash-auto', category: 'auto', price: 1200, priceType: 'fixed', emoji: '🚗', durationLabel: '45 min', popular: true, shortDesc: 'Exterior + interior vacuum.' }),
  offer({ slug: 'full-detailing', name: 'Full Detailing', provider: 'shinewash-auto', category: 'auto', price: 6500, priceType: 'from', emoji: '✨', durationLabel: '3–4 hrs', shortDesc: 'Polish, wax & deep interior.' }),
  // Laundry
  offer({ slug: 'wash-iron-bundle', name: 'Wash & Iron (per kg)', provider: 'freshfold-laundry', category: 'laundry', price: 250, priceType: 'from', emoji: '🧺', durationLabel: 'next-day', popular: true, shortDesc: 'Free pickup & delivery.' }),
  offer({ slug: 'dry-clean-suit', name: 'Dry Clean (3-pc suit)', provider: 'freshfold-laundry', category: 'laundry', price: 900, priceType: 'fixed', emoji: '🤵', durationLabel: '2 days', shortDesc: 'Premium dry cleaning.' }),
]
