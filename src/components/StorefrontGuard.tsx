'use client'

import { useEffect } from 'react'
import { useAdminOverrides } from '@/store/adminOverrides'

/**
 * Enforces admin moderation on the static storefront. Every card renders a
 * `data-entity="<key>"` attribute; this guard hides/tags/reorders those nodes
 * client-side so hide/remove/freeze/feature take effect live without a rebuild.
 */
export function StorefrontGuard() {
  const flags = useAdminOverrides((s) => s.flags)

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-entity]'))
    const featuredParents = new Set<HTMLElement>()

    for (const el of nodes) {
      const key = el.getAttribute('data-entity')
      if (!key) continue
      const f = flags[key] ?? []
      const hide = f.includes('hidden') || f.includes('removed')

      el.style.display = hide ? 'none' : ''
      el.toggleAttribute('data-frozen', f.includes('frozen'))

      const isFeatured = f.includes('featured') && !hide
      el.toggleAttribute('data-featured', isFeatured)
      // Subtle featured ring — depth without shouting.
      el.style.outline = isFeatured ? '2px solid rgb(var(--accent))' : ''
      el.style.outlineOffset = isFeatured ? '2px' : ''
      if (isFeatured && getComputedStyle(el).position === 'static') el.style.position = 'relative'

      // "Featured" corner tag.
      const featTag = el.querySelector('[data-feat-tag]')
      if (isFeatured && !featTag) {
        const t = document.createElement('span')
        t.setAttribute('data-feat-tag', '')
        t.textContent = '★ Featured'
        t.style.cssText =
          'position:absolute;top:8px;left:8px;z-index:6;background:rgb(var(--accent));color:#fff;font-size:10px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;padding:3px 8px;border-radius:8px;pointer-events:none'
        el.appendChild(t)
      } else if (!isFeatured && featTag) {
        featTag.remove()
      }
      if (isFeatured && el.parentElement) featuredParents.add(el.parentElement)

      // Frozen overlay: visible but not orderable.
      const frozenTag = el.querySelector('[data-frozen-tag]')
      if (f.includes('frozen') && !hide && !frozenTag) {
        const tag = document.createElement('span')
        tag.setAttribute('data-frozen-tag', '')
        tag.textContent = 'Temporarily unavailable'
        tag.style.cssText =
          'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:7;background:rgba(20,18,16,0.55);color:#fff;font-size:12px;font-weight:700;border-radius:inherit;backdrop-filter:blur(1px);pointer-events:none;text-align:center;padding:8px'
        if (getComputedStyle(el).position === 'static') el.style.position = 'relative'
        el.appendChild(tag)
      } else if ((!f.includes('frozen') || hide) && frozenTag) {
        frozenTag.remove()
      }
    }

    // Pin featured cards to the front of their container (impulse-first placement).
    for (const parent of featuredParents) {
      const featured = Array.from(parent.querySelectorAll<HTMLElement>(':scope > [data-featured]'))
      for (let i = featured.length - 1; i >= 0; i--) parent.prepend(featured[i])
    }
  }, [flags])

  return null
}
