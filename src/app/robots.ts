import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/data/verticals'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Everyone, including AI crawlers (GPTBot, PerplexityBot, Google-Extended, etc.), may index.
      { userAgent: '*', allow: '/', disallow: ['/cart', '/checkout', '/foodcart', '/foodcheckout', '/bookings'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
