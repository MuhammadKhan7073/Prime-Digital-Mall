'use client'

import type { ShopAbout as ShopAboutData } from '@/data/types'
import { useHydrated } from '@/lib/useHydrated'
import { useSellerProfiles } from '@/store/sellerProfiles'
import { ShopAbout } from './ShopAbout'

/**
 * Renders the shop "About" panel, preferring a seller's own edits (from
 * /seller) over the bundled default. Client component so seller overrides
 * appear instantly on the static page.
 */
export function ShopAboutLive({ slug, name, about }: { slug: string; name: string; about?: ShopAboutData }) {
  const hydrated = useHydrated()
  const override = useSellerProfiles((s) => s.about[slug])
  const effective = hydrated && override ? override : about
  return <ShopAbout name={name} about={effective} />
}
