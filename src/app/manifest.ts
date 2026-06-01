import type { MetadataRoute } from 'next'
import { SITE_NAME } from '@/data/verticals'

export const dynamic = 'force-static'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Pakistan’s Everything Platform`,
    short_name: SITE_NAME,
    description: 'Shop, food, health & home services across Pakistan.',
    id: `${base}/`,
    start_url: `${base}/`,
    scope: `${base}/`,
    display: 'standalone',
    background_color: '#faf8f4',
    theme_color: '#0f6350',
    icons: [
      { src: `${base}/icon.svg`, sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: `${base}/icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: `${base}/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: `${base}/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    categories: ['shopping', 'food', 'medical', 'lifestyle'],
    lang: 'en',
  }
}
