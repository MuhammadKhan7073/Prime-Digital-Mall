'use client'

import { useEffect } from 'react'
import { useAdminOverrides } from '@/store/adminOverrides'

/**
 * Enforces admin moderation on the static storefront. Every card renders a
 * `data-entity="<key>"` attribute; this guard hides/tags those nodes client-side
 * so hide/remove/freeze/feature take effect live without a backend rebuild.
 */
export function StorefrontGuard() {
  const flags = useAdminOverrides((s) => s.flags)

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-entity]'))
    for (const el of nodes) {
      const key = el.getAttribute('data-entity')
      if (!key) continue
      const f = flags[key] ?? []
      const hide = f.includes('hidden') || f.includes('removed')

      el.style.display = hide ? 'none' : ''
      el.toggleAttribute('data-frozen', f.includes('frozen'))
      el.toggleAttribute('data-featured', f.includes('featured'))

      // Manage a small "Unavailable" tag for frozen items (still visible, not orderable).
      const existing = el.querySelector('[data-frozen-tag]')
      if (f.includes('frozen') && !existing) {
        const tag = document.createElement('span')
        tag.setAttribute('data-frozen-tag', '')
        tag.textContent = 'Temporarily unavailable'
        tag.style.cssText =
          'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:5;background:rgba(20,18,16,0.55);color:#fff;font-size:12px;font-weight:700;border-radius:inherit;backdrop-filter:blur(1px);pointer-events:none;text-align:center;padding:8px'
        const host = el as HTMLElement
        if (getComputedStyle(host).position === 'static') host.style.position = 'relative'
        host.appendChild(tag)
      } else if (!f.includes('frozen') && existing) {
        existing.remove()
      }
    }
  }, [flags])

  return null
}
