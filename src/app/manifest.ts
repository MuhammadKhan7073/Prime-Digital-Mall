import type { MetadataRoute } from 'next'
import { SITE_NAME } from '@/data/verticals'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Pakistan’s Everything Platform`,
    short_name: SITE_NAME,
    description: 'Shop, food, health & home services across Pakistan.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf8f4',
    theme_color: '#0f6350',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
    categories: ['shopping', 'food', 'medical', 'lifestyle'],
    lang: 'en',
  }
}
