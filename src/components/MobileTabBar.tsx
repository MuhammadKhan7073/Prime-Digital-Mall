'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, Search, Package, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useHydrated } from '@/lib/useHydrated'
import { cartCount, useCart } from '@/store/cart'
import { useUI } from '@/store/ui'

export function MobileTabBar() {
  const pathname = usePathname()
  const hydrated = useHydrated()
  const openSearch = useUI((s) => s.openSearch)
  const openCart = useUI((s) => s.openCart)
  const count = useCart(cartCount)

  const tab = 'relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium'
  const active = (href: string) => pathname === href

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-line bg-surface/95 backdrop-blur-lg lg:hidden">
      <Link href="/" className={cn(tab, active('/') ? 'text-brand' : 'text-muted')}>
        <Home size={20} /> Home
      </Link>
      <Link href="/shop" className={cn(tab, active('/shop') ? 'text-brand' : 'text-muted')}>
        <LayoutGrid size={20} /> Explore
      </Link>
      <button onClick={openSearch} className={cn(tab, 'text-muted')}>
        <Search size={20} /> Search
      </button>
      <Link href="/orders" className={cn(tab, active('/orders') ? 'text-brand' : 'text-muted')}>
        <Package size={20} /> Orders
      </Link>
      <button onClick={openCart} className={cn(tab, 'text-muted')}>
        <span className="relative">
          <ShoppingCart size={20} />
          {hydrated && count > 0 && <span className="absolute -right-2 -top-1 grid h-4 min-w-[1rem] place-items-center rounded-full bg-deal px-1 text-[9px] font-bold text-white">{count}</span>}
        </span>
        Cart
      </button>
    </nav>
  )
}
