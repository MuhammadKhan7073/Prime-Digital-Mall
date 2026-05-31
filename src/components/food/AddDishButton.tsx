'use client'

import { Plus, Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/cn'
import type { Dish } from '@/data/food'
import { useFoodCart } from '@/store/foodcart'
import { useUI } from '@/store/ui'

/** Adds a dish to the food cart. Handles the single-restaurant rule with a confirm. */
export function AddDishButton({ dish, full = false }: { dish: Dish; full?: boolean }) {
  const add = useFoodCart((s) => s.add)
  const replaceWith = useFoodCart((s) => s.replaceWith)
  const toast = useUI((s) => s.toast)
  const [done, setDone] = useState(false)

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const res = add(dish.slug, dish.restaurant)
    if (res.conflict) {
      const ok = typeof window !== 'undefined' && window.confirm('Your food cart has items from another restaurant. Start a new order with this dish?')
      if (!ok) return
      replaceWith(dish.slug, dish.restaurant)
    }
    toast(`Added ${dish.name}`, { href: '/foodcart', hrefLabel: 'View order' })
    setDone(true)
    setTimeout(() => setDone(false), 1000)
  }

  return (
    <button
      onClick={onClick}
      className={cn('btn-primary', full ? 'btn-md w-full' : 'btn-sm', 'shrink-0')}
      style={{ backgroundColor: 'rgb(var(--accent))' }}
    >
      {done ? <Check size={15} /> : <Plus size={15} />} {done ? 'Added' : 'Add'}
    </button>
  )
}
