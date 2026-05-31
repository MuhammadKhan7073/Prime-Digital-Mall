import Link from 'next/link'
import type { Category } from '@/data/types'
import { HScroll } from './HScroll'
import { DynIcon } from './ui/Icon'

export function CategoryNav({ categories }: { categories: (Category & { count?: number })[] }) {
  return (
    <HScroll>
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/category/${c.slug}`}
          className="group flex w-[92px] shrink-0 snap-start flex-col items-center gap-2 sm:w-[108px]"
        >
          <span
            className="grid h-16 w-16 place-items-center rounded-2xl text-white shadow-card transition-transform group-hover:-translate-y-0.5 group-active:scale-95 sm:h-20 sm:w-20"
            style={{ backgroundImage: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
          >
            <DynIcon name={c.icon} size={26} />
          </span>
          <span className="text-center text-xs font-semibold leading-tight text-ink">{c.name}</span>
        </Link>
      ))}
    </HScroll>
  )
}
