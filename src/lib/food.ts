import { cuisines, dishes, restaurants } from '@/data/food'
import type { Cuisine, Dish, Restaurant } from '@/data/food'

export const allRestaurants = restaurants
export const allCuisines = cuisines
export const allDishes = dishes

export const getRestaurant = (slug: string): Restaurant | undefined => restaurants.find((r) => r.slug === slug)
export const getDish = (slug: string): Dish | undefined => dishes.find((d) => d.slug === slug)
export const getCuisine = (slug: string): Cuisine | undefined => cuisines.find((c) => c.slug === slug)
export const restaurantOf = (d: Dish): Restaurant | undefined => restaurants.find((r) => r.slug === d.restaurant)

export const dishesOf = (slug: string): Dish[] => dishes.filter((d) => d.restaurant === slug)
export const popularDishes = (limit = 10): Dish[] => dishes.filter((d) => d.popular).slice(0, limit)

export function restaurantsByCuisine(slug: string): Restaurant[] {
  return restaurants.filter((r) => r.cuisine.includes(slug))
}

export function dishCategories(slug: string): string[] {
  const set = new Set(dishesOf(slug).map((d) => d.category))
  return Array.from(set)
}

export function topRestaurants(limit = 12): Restaurant[] {
  return [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, limit)
}

export function restaurantsInCity(citySlug: string | null): Restaurant[] {
  if (!citySlug) return restaurants
  const local = restaurants.filter((r) => r.city === citySlug)
  return local.length ? local : restaurants
}

export interface FoodFilterOpts {
  query?: string
  cuisine?: string
  city?: string
  openOnly?: boolean
  sort?: 'rating' | 'fast' | 'cheap'
}

export function filterRestaurants(o: FoodFilterOpts): Restaurant[] {
  let list = restaurants.slice()
  if (o.cuisine) list = list.filter((r) => r.cuisine.includes(o.cuisine!))
  if (o.city) list = list.filter((r) => r.city === o.city)
  if (o.openOnly) list = list.filter((r) => r.open)
  if (o.query?.trim()) {
    const q = o.query.toLowerCase()
    list = list.filter((r) => `${r.name} ${r.tagline} ${r.cuisine.join(' ')}`.toLowerCase().includes(q))
  }
  switch (o.sort) {
    case 'fast': list.sort((a, b) => a.deliveryMins - b.deliveryMins); break
    case 'cheap': list.sort((a, b) => a.priceTier - b.priceTier); break
    case 'rating':
    default: list.sort((a, b) => b.rating - a.rating)
  }
  return list
}
