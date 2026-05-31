import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <span className="text-6xl">🧭</span>
      <h1 className="text-2xl font-extrabold text-ink">Page not found</h1>
      <p className="max-w-sm text-sm text-muted">The page you’re looking for moved or never existed. Let’s get you back to shopping.</p>
      <div className="flex gap-2">
        <Link href="/" className="btn-primary btn-md"><Home size={17} /> Home</Link>
        <Link href="/search" className="btn-ghost btn-md"><Search size={17} /> Browse products</Link>
      </div>
    </div>
  )
}
