/** Domain types for Prime Digital Mall — Pakistani city-based marketplace. */

export interface City {
  slug: string
  name: string
  province: string
  popular: boolean
}

export interface Category {
  slug: string
  name: string
  /** lucide-react icon name, resolved at render time. */
  icon: string
  blurb: string
  from: string
  to: string
}

/** How a shop fulfils orders. */
export type Delivery = 'pakistan' | 'city' | 'none'

export interface Shop {
  slug: string
  name: string
  /** Home city slug. */
  city: string
  category: string
  delivery: Delivery
  /** Extra city slugs this shop delivers to (when delivery is city-scoped). */
  deliversTo?: string[]
  rating: number
  ratingCount: number
  verified: boolean
  tagline: string
  emoji: string
  from: string
  to: string
  phone: string
  followers: number
  /** Percentage 0-100. */
  responseRate: number
  joinedDays: number
  badges: string[]
}

export interface VariantOption {
  value: string
  swatch?: string
  /** Per-option price delta in rupees. */
  deltaRupees?: number
  soldOut?: boolean
}

export interface VariantGroup {
  name: string
  type: 'swatch' | 'pill'
  options: VariantOption[]
}

export interface Spec {
  label: string
  value: string
}

export interface Product {
  slug: string
  name: string
  /** Owning shop slug. */
  shop: string
  category: string
  /** Price in whole rupees. */
  price: number
  /** Original price when on sale. */
  compareAt?: number
  emoji: string
  from: string
  to: string
  rating: number
  reviewCount: number
  sold: number
  /** Units in stock; 0 = sold out. */
  stock: number
  freeShipping: boolean
  /** 'new' | 'bestseller' | 'trending' | 'editor' | 'flash'. */
  tags: string[]
  shortDesc: string
  description: string
  highlights: string[]
  specs: Spec[]
  variantGroups?: VariantGroup[]
  pairsWith?: string[]
  createdDaysAgo: number
}

export interface Review {
  id: string
  productSlug: string
  author: string
  avatarColor: string
  rating: number
  date: string
  title: string
  body: string
  helpful: number
  verified: boolean
}
