import Link from 'next/link'
import { Store, MessageCircle, ShieldCheck } from 'lucide-react'
import { allCategories } from '@/lib/catalog'
import { PAYMENT } from '@/data/catalog'
import { waTeam } from '@/lib/whatsapp'

export function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-surface">
      <div className="container-app grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-brand-fg">
              <Store size={18} />
            </span>
            <span className="text-base font-extrabold text-ink">Prime Digital Mall</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">Pakistan’s everything store. Real shops, real delivery, honest prices.</p>
          <a href={waTeam()} target="_blank" rel="noreferrer" className="btn-wa btn-sm mt-4">
            <MessageCircle size={15} /> Chat on WhatsApp
          </a>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-ink">Shop</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/deals" className="hover:text-brand">Today’s Deals</Link></li>
            <li><Link href="/shops" className="hover:text-brand">All Shops</Link></li>
            <li><Link href="/request" className="hover:text-brand">Add your city</Link></li>
            <li><Link href="/request" className="hover:text-brand">Suggest a feature</Link></li>
            <li><Link href="/sell" className="font-semibold text-brand hover:underline">Sell on Prime →</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-ink">Categories</h3>
          <ul className="space-y-2 text-sm text-muted">
            {allCategories.slice(0, 6).map((c) => (
              <li key={c.slug}><Link href={`/category/${c.slug}`} className="hover:text-brand">{c.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-ink">Pay your way</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-success" /> Cash on Delivery</li>
            <li>Easypaisa</li>
            <li>{PAYMENT.bank.bankName}</li>
            <li className="pt-1 text-xs text-faint">Buyer-protected checkout</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4">
        <p className="container-app text-center text-xs text-faint">© {2026} Prime Digital Mall · Made in Pakistan 🇵🇰</p>
      </div>
    </footer>
  )
}
