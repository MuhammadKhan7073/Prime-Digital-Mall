import { SITE_NAME, SITE_URL } from '@/data/verticals'
import { PAYMENT } from '@/data/catalog'

/** Inline a JSON-LD <script> block. Server component, no client JS. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

/** Organization + WebSite with Sitelinks Search Box — emitted once in the root layout. */
export function OrgJsonLd() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: 'Pakistan’s everything platform — shopping, food, health and home services.',
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: `+92${PAYMENT.whatsapp.replace(/^0/, '')}`,
      areaServed: 'PK',
      availableLanguage: ['en', 'ur'],
    },
  }
  const site = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/find?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
  return (
    <>
      <JsonLd data={org} />
      <JsonLd data={site} />
    </>
  )
}

/** Breadcrumb trail structured data. */
export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${SITE_URL}${it.url}`,
    })),
  }
  return <JsonLd data={data} />
}

/** Product rich-result structured data. */
export function ProductJsonLd({
  name,
  description,
  image,
  price,
  rating,
  reviewCount,
  inStock,
  brand,
  url,
}: {
  name: string
  description: string
  image?: string
  price: number
  rating: number
  reviewCount: number
  inStock: boolean
  brand?: string
  url: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    ...(image ? { image } : {}),
    ...(brand ? { brand: { '@type': 'Brand', name: brand } } : {}),
    aggregateRating: { '@type': 'AggregateRating', ratingValue: rating, reviewCount },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'PKR',
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    },
  }
  return <JsonLd data={data} />
}

/** Restaurant structured data. */
export function RestaurantJsonLd({ name, description, rating, reviewCount, city, url }: { name: string; description: string; rating: number; reviewCount: number; city: string; url: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name,
    description,
    address: { '@type': 'PostalAddress', addressLocality: city, addressCountry: 'PK' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: rating, reviewCount },
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
  }
  return <JsonLd data={data} />
}

/** Physician structured data (doctor profile). */
export function PhysicianJsonLd({ name, specialty, rating, reviewCount, clinic, city, url }: { name: string; specialty: string; rating: number; reviewCount: number; clinic?: string; city?: string; url: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name,
    medicalSpecialty: specialty,
    ...(clinic ? { worksFor: { '@type': 'MedicalClinic', name: clinic } } : {}),
    ...(city ? { address: { '@type': 'PostalAddress', addressLocality: city, addressCountry: 'PK' } } : {}),
    aggregateRating: { '@type': 'AggregateRating', ratingValue: rating, reviewCount },
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
  }
  return <JsonLd data={data} />
}

/** Generic local service-provider structured data. */
export function ServiceJsonLd({ name, description, rating, reviewCount, city, url }: { name: string; description: string; rating: number; reviewCount: number; city: string; url: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    address: { '@type': 'PostalAddress', addressLocality: city, addressCountry: 'PK' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: rating, reviewCount },
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
  }
  return <JsonLd data={data} />
}
