// Generate the static OG share image -> public/og.png (1200x630).
// Authored as SVG, rasterized with sharp. Run via `npm run og`.
const sharp = require('sharp')
const { writeFileSync, mkdirSync } = require('node:fs')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f6350"/>
      <stop offset="1" stop-color="#0b4a3c"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.85" cy="0.15" r="0.5">
      <stop offset="0" stop-color="#b77c1c" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#b77c1c" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.08" cy="0.92" r="0.5">
      <stop offset="0" stop-color="#34c7a1" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#34c7a1" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- logo -->
  <rect x="80" y="70" width="92" height="92" rx="22" fill="rgba(255,255,255,0.16)"/>
  <path d="M108 118h36l-3.5 22a4 4 0 0 1-4 3.4h-18a4 4 0 0 1-4-3.4L108 118Z" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>
  <path d="M115 118a11 11 0 0 1 22 0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
  <text x="190" y="128" font-family="Georgia, serif" font-size="40" font-weight="700" fill="#ffffff">Prime Digital Mall</text>

  <!-- headline -->
  <text x="80" y="330" font-family="Georgia, serif" font-size="78" font-weight="800" fill="#ffffff">Everything you need,</text>
  <text x="80" y="420" font-family="Georgia, serif" font-size="78" font-weight="800" fill="#ffd9a0">one place.</text>
  <text x="82" y="478" font-family="Arial, sans-serif" font-size="32" fill="#e8f3ef">Shop &#183; Food &#183; Health &#183; Services &#8212; across Pakistan</text>

  <!-- chips -->
  <g font-family="Arial, sans-serif" font-size="26" fill="#ffffff">
    <rect x="80" y="520" width="220" height="56" rx="28" fill="rgba(255,255,255,0.18)"/>
    <text x="110" y="556">Fast delivery</text>
    <rect x="320" y="520" width="270" height="56" rx="28" fill="rgba(255,255,255,0.18)"/>
    <text x="350" y="556">Cash on delivery</text>
    <rect x="610" y="520" width="240" height="56" rx="28" fill="rgba(255,255,255,0.18)"/>
    <text x="640" y="556">Verified shops</text>
  </g>
</svg>`

;(async () => {
  const png = await sharp(Buffer.from(svg)).png().toBuffer()
  mkdirSync('public', { recursive: true })
  writeFileSync('public/og.png', png)
  console.log('og.png written:', png.length, 'bytes')
})()
