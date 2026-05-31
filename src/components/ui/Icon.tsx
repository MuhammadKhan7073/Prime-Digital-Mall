import {
  AirVent,
  BookOpen,
  Bug,
  Car,
  Cpu,
  GraduationCap,
  Plug,
  Refrigerator,
  Scissors,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  Smartphone,
  Sofa,
  Sparkles,
  Stethoscope,
  Tag,
  Truck,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

const MAP: Record<string, LucideIcon> = {
  // shopping categories
  Cpu,
  Smartphone,
  Shirt,
  ShoppingBasket,
  Sofa,
  Sparkles,
  Refrigerator,
  BookOpen,
  // verticals
  ShoppingBag,
  UtensilsCrossed,
  Stethoscope,
  Wrench,
  // service categories
  AirVent,
  Plug,
  Scissors,
  GraduationCap,
  Truck,
  Bug,
  Car,
}

/** Resolve an icon name (string in data) to a lucide icon component. */
export function DynIcon({ name, size = 18, className }: { name: string; size?: number; className?: string }) {
  const Cmp = MAP[name] ?? Tag
  return <Cmp size={size} className={className} />
}
