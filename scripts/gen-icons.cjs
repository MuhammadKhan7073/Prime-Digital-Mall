// Generate PWA PNG icons (192 + 512, with maskable safe-area padding) to public/.
// Run via `npm run icons`.
const sharp = require('sharp')
const { writeFileSync, mkdirSync } = require('node:fs')

// On-brand jade tile with a shopping-bag glyph (matches src/app/icon.svg).
const svg = (size, pad) => {
  const s = size
  const m = Math.round(s * pad) // maskable safe-area margin
  const inner = s - m * 2
  const x = m
  const r = Math.round(inner * 0.22)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <rect width="${s}" height="${s}" fill="#0f6350"/>
    <rect x="${x}" y="${x}" width="${inner}" height="${inner}" rx="${r}" fill="#0f6350"/>
    <g transform="translate(${x},${x}) scale(${inner / 64})" fill="none" stroke="#fff" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round">
      <path d="M20 22h24l-2.5 16a4 4 0 0 1-4 3.4H26.5a4 4 0 0 1-4-3.4L20 22Z"/>
      <path d="M25 22a7 7 0 0 1 14 0"/>
    </g>
    <circle cx="${s / 2}" cy="${x + inner * 0.48}" r="${inner * 0.045}" fill="#b77c1c"/>
  </svg>`
}

;(async () => {
  mkdirSync('public', { recursive: true })
  // 192: minimal padding. 512: ~12% safe area so it survives maskable cropping.
  for (const [size, pad, name] of [[192, 0.06, 'icon-192.png'], [512, 0.12, 'icon-512.png']]) {
    const png = await sharp(Buffer.from(svg(size, pad))).png().toBuffer()
    writeFileSync(`public/${name}`, png)
    console.log('wrote', name, png.length, 'bytes')
  }
})()
