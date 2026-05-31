'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Theme = 'light' | 'dark'

export interface Toast {
  id: number
  message: string
  kind: 'success' | 'info'
  href?: string
  hrefLabel?: string
}

let toastSeq = 0

interface UIState {
  /* persisted */
  city: string | null
  theme: Theme
  /* ephemeral */
  cartOpen: boolean
  searchOpen: boolean
  mobileMenuOpen: boolean
  cityPickerOpen: boolean
  quickView: string | null
  toasts: Toast[]
  /* actions */
  setCity: (slug: string | null) => void
  setTheme: (t: Theme) => void
  toggleTheme: () => void
  openCart: () => void
  closeCart: () => void
  openSearch: () => void
  closeSearch: () => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  openCityPicker: () => void
  closeCityPicker: () => void
  openQuickView: (slug: string) => void
  closeQuickView: () => void
  toast: (message: string, opts?: Partial<Omit<Toast, 'id' | 'message'>>) => void
  dismissToast: (id: number) => void
}

function applyTheme(t: Theme) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', t === 'dark')
}

export const useUI = create<UIState>()(
  persist(
    (set, get) => ({
      city: null,
      theme: 'light',
      cartOpen: false,
      searchOpen: false,
      mobileMenuOpen: false,
      cityPickerOpen: false,
      quickView: null,
      toasts: [],

      setCity: (slug) => set({ city: slug, cityPickerOpen: false }),
      setTheme: (t) => {
        applyTheme(t)
        set({ theme: t })
      },
      toggleTheme: () => {
        const t = get().theme === 'dark' ? 'light' : 'dark'
        applyTheme(t)
        set({ theme: t })
      },

      openCart: () => set({ cartOpen: true }),
      closeCart: () => set({ cartOpen: false }),
      openSearch: () => set({ searchOpen: true }),
      closeSearch: () => set({ searchOpen: false }),
      toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
      closeMobileMenu: () => set({ mobileMenuOpen: false }),
      openCityPicker: () => set({ cityPickerOpen: true }),
      closeCityPicker: () => set({ cityPickerOpen: false }),
      openQuickView: (slug) => set({ quickView: slug }),
      closeQuickView: () => set({ quickView: null }),

      toast: (message, opts) => {
        const id = ++toastSeq
        set((s) => ({ toasts: [...s.toasts, { id, message, kind: opts?.kind ?? 'success', href: opts?.href, hrefLabel: opts?.hrefLabel }] }))
        if (typeof window !== 'undefined') {
          window.setTimeout(() => get().dismissToast(id), 3200)
        }
      },
      dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: 'pdm-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ city: s.city, theme: s.theme }),
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.theme)
      },
    },
  ),
)
