import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allCategories, getCategory, productsByCategory } from '@/lib/catalog'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductBrowser } from '@/components/ProductBrowser'
import { DynIcon } from '@/components/ui/Icon'

export function generateStaticParams() {
  return allCategories.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCategory(params.slug)
  return { title: c ? c.name : 'Category', description: c?.blurb }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug)
  if (!cat) notFound()
  const products = productsByCategory(cat.slug)

  return (
    <div className="flex flex-col gap-2">
      <div className="container-app">
        <Breadcrumbs items={[{ label: cat.name }]} />
        <div className="mb-5 flex items-center gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-card" style={{ backgroundImage: `linear-gradient(135deg, ${cat.from}, ${cat.to})` }}>
            <DynIcon name={cat.icon} size={26} />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-ink">{cat.name}</h1>
            <p className="text-sm text-muted">{cat.blurb}</p>
          </div>
        </div>
      </div>
      <ProductBrowser products={products} enableShopFilter />
    </div>
  )
}
