import type { Metadata, Viewport } from 'next'
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_URL } from '@/data/verticals'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileTabBar } from '@/components/MobileTabBar'
import { Providers } from '@/components/Providers'
import { OrgJsonLd } from '@/components/JsonLd'

// Display: warm optical serif with character. Body: clean, friendly grotesque.
const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
})
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Prime Digital Mall — Shop, Food, Health & Services in Pakistan',
    template: '%s · Prime Digital Mall',
  },
  description:
    'Pakistan’s everything platform — shop products, order food, book doctors and home services across Karachi, Lahore, Islamabad & more. Fast delivery, cash on delivery, honest prices.',
  applicationName: SITE_NAME,
  keywords: ['online shopping Pakistan', 'food delivery Pakistan', 'book doctor Pakistan', 'home services Pakistan', 'Daraz alternative', 'marketplace Pakistan', 'Karachi', 'Lahore', 'Islamabad'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: 'Prime Digital Mall — Pakistan’s Everything Platform',
    description: 'Shop, eat, get well and get things done — across Pakistan. Fast delivery, cash on delivery.',
    url: SITE_URL,
    locale: 'en_PK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prime Digital Mall — Pakistan’s Everything Platform',
    description: 'Shop, food, health & home services across Pakistan.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#0f6350',
  width: 'device-width',
  initialScale: 1,
}

/** Set theme class before first paint to avoid a flash. */
const themeScript = `(function(){try{var s=JSON.parse(localStorage.getItem('pdm-ui')||'{}');if(s&&s.state&&s.state.theme==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans">
        <OrgJsonLd />
        <Header />
        <main className="pb-20 pt-4 lg:pb-10">{children}</main>
        <Footer />
        <MobileTabBar />
        <Providers />
      </body>
    </html>
  )
}
