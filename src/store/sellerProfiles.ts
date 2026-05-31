'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ShopAbout } from '@/data/types'

/**
 * Seller-authored overrides for their shop's "About" depth. Keyed by shop slug.
 * Demo mode = browser-local. In real mode this maps to a `seller_profiles`
 * table gated by Supabase auth (only the owner can edit their row).
 */
interface SellerProfilesState {
  about: Record<string, ShopAbout>
  setAbout: (slug: string, about: ShopAbout) => void
  clear: (slug: string) => void
}

export const useSellerProfiles = create<SellerProfilesState>()(
  persist(
    (set) => ({
      about: {},
      setAbout: (slug, about) => set((s) => ({ about: { ...s.about, [slug]: about } })),
      clear: (slug) => set((s) => { const a = { ...s.about }; delete a[slug]; return { about: a } }),
    }),
    { name: 'pdm-seller-profiles', storage: createJSONStorage(() => localStorage) },
  ),
)
