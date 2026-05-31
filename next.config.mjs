/** @type {import('next').NextConfig} */

// When deploying to a GitHub Pages *project* site the app is served from a
// sub-path (/<repo>/). Set NEXT_PUBLIC_BASE_PATH at build time to that path.
// Left empty for root hosting (Cloudflare Pages, Netlify, custom domain).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Fully static export → deployable free on any static host. Ordering is
  // WhatsApp-based, so no server is needed. Produces an `out/` folder on build.
  output: 'export',
  // Static export can't use the Next Image Optimizer; we use CSS-gradient art + SVG.
  images: { unoptimized: true },
  basePath: basePath || undefined,
  trailingSlash: true,
}

export default nextConfig
