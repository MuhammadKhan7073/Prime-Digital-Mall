'use client'

import { CartDrawer } from '@/components/CartDrawer'
import { QuickViewModal } from '@/components/QuickViewModal'
import { SearchCommand } from '@/components/SearchCommand'
import { CityPicker } from '@/components/CityPicker'
import { Toaster } from '@/components/Toaster'
import { FoodCartBar } from '@/components/food/FoodCartBar'

/** Mounts all global overlays once, at the root. */
export function Providers() {
  return (
    <>
      <SearchCommand />
      <CityPicker />
      <CartDrawer />
      <QuickViewModal />
      <FoodCartBar />
      <Toaster />
    </>
  )
}
