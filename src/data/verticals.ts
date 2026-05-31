/** The four verticals of the Everything Platform. Single registry. */

/**
 * Public site URL — used for canonical links, sitemap, OG tags, JSON-LD.
 * Override at build time with NEXT_PUBLIC_SITE_URL once the domain is live.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://primedigitalmall.com').replace(/\/$/, '')
export const SITE_NAME = 'Prime Digital Mall'

export type VerticalSlug = 'shop' | 'food' | 'health' | 'services'
export type Paradigm = 'order' | 'book'

export interface Vertical {
  slug: VerticalSlug
  name: string
  short: string
  /** lucide icon name */
  icon: string
  blurb: string
  paradigm: Paradigm
  href: string
  from: string
  to: string
  /** primary action verb shown on cards */
  cta: string
}

export const verticals: Vertical[] = [
  {
    slug: 'shop',
    name: 'Shopping',
    short: 'Shop',
    icon: 'ShoppingBag',
    blurb: 'Electronics, fashion, grocery & more',
    paradigm: 'order',
    href: '/shop',
    from: '#0f6350',
    to: '#34c7a1',
    cta: 'Shop now',
  },
  {
    slug: 'food',
    name: 'Food',
    short: 'Food',
    icon: 'UtensilsCrossed',
    blurb: 'Restaurants & home chefs, delivered hot',
    paradigm: 'order',
    href: '/food',
    from: '#c2410c',
    to: '#f59e0b',
    cta: 'Order food',
  },
  {
    slug: 'health',
    name: 'Health',
    short: 'Health',
    icon: 'Stethoscope',
    blurb: 'Doctors, clinics, labs & pharmacy',
    paradigm: 'book',
    href: '/health',
    from: '#0369a1',
    to: '#22d3ee',
    cta: 'Book a doctor',
  },
  {
    slug: 'services',
    name: 'Services',
    short: 'Services',
    icon: 'Wrench',
    blurb: 'Cleaning, repairs, beauty, tutoring & more',
    paradigm: 'book',
    href: '/services',
    from: '#6d28d9',
    to: '#a855f7',
    cta: 'Book a service',
  },
]

export const getVertical = (slug: string): Vertical | undefined => verticals.find((v) => v.slug === slug)
