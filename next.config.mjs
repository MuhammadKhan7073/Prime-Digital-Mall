/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Fully static export → deployable free on Cloudflare Pages / Netlify / any static host.
  // Ordering is WhatsApp-based, so no server is needed. Produces an `out/` folder on `npm run build`.
  output: 'export',
  // Static export can't use the Next Image Optimizer; we use CSS-gradient art + SVG anyway.
  images: { unoptimized: true },
}

export default nextConfig
