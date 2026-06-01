'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface UserReview {
  id: string
  productSlug: string
  author: string
  rating: number
  title: string
  body: string
  createdAt: number
}

interface UserReviewsState {
  reviews: UserReview[]
  add: (r: Omit<UserReview, 'id' | 'createdAt'>) => void
  remove: (id: string) => void
  forProduct: (slug: string) => UserReview[]
}

export const useUserReviews = create<UserReviewsState>()(
  persist(
    (set, get) => ({
      reviews: [],
      add: (r) =>
        set((s) => ({ reviews: [{ ...r, id: 'ur-' + Math.floor(100000 + Math.random() * 900000), createdAt: Date.now() }, ...s.reviews] })),
      remove: (id) => set((s) => ({ reviews: s.reviews.filter((x) => x.id !== id) })),
      forProduct: (slug) => get().reviews.filter((r) => r.productSlug === slug),
    }),
    { name: 'pdm-user-reviews', storage: createJSONStorage(() => localStorage) },
  ),
)
