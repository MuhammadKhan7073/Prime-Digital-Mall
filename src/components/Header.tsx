'use client'

import Link from 'next/link'
import { Search, ShoppingCart, Heart, MapPin, Menu, X, Moon, Sun, ChevronDown, Zap, Store, Lightbulb, CalendarCheck } from 'lucide-react'
import { cn } from '@/lib/cn'
import { getCity } from '@/lib/catalog'
import { verticals } from '@/data/verticals'
import { useHydrated } from '@/lib/useHydrated'
import { cartCount, useCart } from '@/store/cart'
import { useWishlist } from '@/store/wishlist'
import { useUI } from '@/store/ui'
import { DynIcon } from '@/components/ui/Icon'
import { VerticalSwitcher } from '@/components/VerticalSwitcher'

function CountBadge({ n }: { n: number }) {
  if (n <= 0) return null
  return (
    <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-deal px-1 text-[10px] font-bold text-white animate-cart-bounce">
      {n > 99 ? '99+' : n}
    </span>
  )
}

export function Header() {
  const hydrated = useHydrated()
  const openSearch = useUI((s) => s.openSearch)
  const openCart = useUI((s) => s.openCart)
  const openCityPicker = useUI((s) => s.openCityPicker)
  const theme = useUI((s) => s.theme)
  const toggleTheme = useUI((s) => s.toggleTheme)
  const mobileOpen = useUI((s) => s.mobileMenuOpen)
  const toggleMobile = useUI((s) => s.toggleMobileMenu)
  const closeMobile = useUI((s) => s.closeMobileMenu)
  const citySlug = useUI((s) => s.city)

  const count = useCart(cartCount)
  const wish = useWishlist((s) => s.slugs.length)
  const cityName = hydrated ? (citySlug ? getCity(citySlug)?.name ?? 'All Pakistan' : 'All Pakistan') : 'Select city'

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-lg">
      <div className="container-app flex h-16 items-center gap-3">
        <button onClick={toggleMobile} className="grid h-10 w-10 place-items-center rounded-xl text-ink hover:bg-elevated lg:hidden" aria-label="Menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-brand-fg shadow-card">
            <Store size={18} />
          </span>
          <span className="hidden font-display text-lg font-bold tracking-tight text-ink sm:block">
            Prime<span className="text-brand"> Digital Mall</span>
          </span>
        </Link>

        {/* City selector */}
        <button
          onClick={openCityPicker}
          className="hidden items-center gap-1.5 rounded-xl border border-line bg-bg px-3 py-2 text-sm font-medium text-ink hover:border-brand md:flex"
        >
          <MapPin size={15} className="text-brand" />
          <span className="max-w-[8rem] truncate">{cityName}</span>
          <ChevronDown size={14} className="text-faint" />
        </button>

        {/* Search (desktop) */}
        <button
          onClick={openSearch}
          className="hidden h-10 flex-1 items-center gap-2 rounded-xl border border-line bg-bg px-3.5 text-sm text-faint transition-colors hover:border-brand md:flex"
        >
          <Search size={16} />
          <span>Search products, food, doctors, services…</span>
          <kbd className="ml-auto hidden rounded border border-line bg-surface px-1.5 py-0.5 text-[10px] font-semibold text-faint lg:block">Ctrl K</kbd>
        </button>

        <div className="flex flex-1 items-center justify-end gap-1 md:flex-none">
          <button onClick={openSearch} className="grid h-10 w-10 place-items-center rounded-xl text-ink hover:bg-elevated md:hidden" aria-label="Search">
            <Search size={20} />
          </button>
          <button onClick={toggleTheme} className="grid h-10 w-10 place-items-center rounded-xl text-ink hover:bg-elevated" aria-label="Toggle theme">
            {hydrated && theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <Link href="/bookings" className="hidden h-10 w-10 place-items-center rounded-xl text-ink hover:bg-elevated md:grid" aria-label="My bookings">
            <CalendarCheck size={20} />
          </Link>
          <Link href="/wishlist" className="relative grid h-10 w-10 place-items-center rounded-xl text-ink hover:bg-elevated" aria-label="Wishlist">
            <Heart size={20} />
            {hydrated && <CountBadge n={wish} />}
          </Link>
          <button onClick={openCart} className="relative grid h-10 w-10 place-items-center rounded-xl text-ink hover:bg-elevated" aria-label="Cart">
            <ShoppingCart size={20} />
            {hydrated && <CountBadge n={count} />}
          </button>
        </div>
      </div>

      {/* Vertical switcher bar (desktop) */}
      <nav className="hidden border-t border-line lg:block">
        <div className="container-app flex h-12 items-center gap-3 overflow-x-auto no-scrollbar">
          <VerticalSwitcher />
          <span className="h-5 w-px bg-line" />
          <Link href="/deals" className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-bold text-deal hover:bg-deal/10">
            <Zap size={14} className="fill-deal" /> Deals
          </Link>
          <Link href="/find" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted hover:bg-elevated hover:text-ink">
            <Search size={14} /> Search all
          </Link>
          <Link href="/bookings" className="ml-auto inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted hover:bg-elevated hover:text-ink">
            <CalendarCheck size={15} /> My bookings
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-line bg-surface lg:hidden animate-slide-up">
          <div className="container-app py-3">
            <button onClick={() => { openCityPicker(); closeMobile() }} className="mb-3 flex w-full items-center gap-2 rounded-xl border border-line bg-bg px-3 py-2.5 text-sm font-medium text-ink">
              <MapPin size={16} className="text-brand" /> Deliver to: <span className="font-bold">{cityName}</span>
              <ChevronDown size={14} className="ml-auto text-faint" />
            </button>
            <p className="px-1 pb-1 text-xs font-bold uppercase tracking-wide text-faint">Explore</p>
            <div className="grid grid-cols-2 gap-1">
              {verticals.map((v) => (
                <Link key={v.slug} href={v.href} onClick={closeMobile} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-elevated">
                  <span className="grid h-7 w-7 place-items-center rounded-lg text-white" style={{ backgroundImage: `linear-gradient(135deg, ${v.from}, ${v.to})` }}>
                    <DynIcon name={v.icon} size={15} />
                  </span>
                  {v.name}
                </Link>
              ))}
            </div>
            <div className="mt-2 border-t border-line pt-2">
              <Link href="/deals" onClick={closeMobile} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-deal hover:bg-elevated">
                <Zap size={16} className="fill-deal" /> Today’s Deals
              </Link>
              <Link href="/bookings" onClick={closeMobile} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-elevated">
                <CalendarCheck size={16} className="text-brand" /> My bookings
              </Link>
              <Link href="/shops" onClick={closeMobile} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-elevated">
                <Store size={16} className="text-brand" /> All shops
              </Link>
              <Link href="/request" onClick={closeMobile} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-elevated">
                <Lightbulb size={16} className="text-accent" /> Add city · Request a feature
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
