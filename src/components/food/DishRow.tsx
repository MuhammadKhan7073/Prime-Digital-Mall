import { Flame, Leaf } from 'lucide-react'
import type { Dish } from '@/data/food'
import { formatPrice, percentOff } from '@/lib/format'
import { ProductImage } from '@/components/ui/ProductImage'
import { AddDishButton } from './AddDishButton'

export function DishRow({ dish }: { dish: Dish }) {
  const off = percentOff(dish.price, dish.compareAt)
  return (
    <div data-entity={`food:listing:${dish.slug}`} className="relative flex gap-3 rounded-2xl border border-line bg-surface p-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          {dish.veg ? <Leaf size={13} className="text-success" /> : <span className="h-3 w-3 rounded-full border-2 border-deal" />}
          <h4 className="truncate font-semibold text-ink">{dish.name}</h4>
          {dish.popular && <span className="rounded bg-accent-soft px-1.5 py-0.5 text-[10px] font-bold uppercase text-accent">Popular</span>}
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-muted">{dish.shortDesc}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="font-bold text-ink tabular">{formatPrice(dish.price)}</span>
          {off > 0 && <span className="text-xs text-faint line-through tabular">{formatPrice(dish.compareAt!)}</span>}
          {dish.spicy > 0 && (
            <span className="inline-flex items-center text-deal">
              {Array.from({ length: dish.spicy }).map((_, i) => <Flame key={i} size={12} className="fill-deal" />)}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ProductImage from={dish.from} to={dish.to} emoji={dish.emoji} className="h-20 w-20 rounded-xl" emojiClassName="text-3xl" />
        <AddDishButton dish={dish} />
      </div>
    </div>
  )
}
