/** Food vertical — restaurants & their menus. Prices in whole PKR. */

export interface Cuisine {
  slug: string
  name: string
  emoji: string
}

export interface Restaurant {
  slug: string
  name: string
  city: string
  cuisine: string[]
  rating: number
  ratingCount: number
  verified: boolean
  tagline: string
  emoji: string
  from: string
  to: string
  phone: string
  /** minutes */
  deliveryMins: number
  deliveryFee: number
  minOrder: number
  priceTier: 1 | 2 | 3
  /** open now (demo flag) */
  open: boolean
  badges: string[]
}

export interface Dish {
  slug: string
  name: string
  restaurant: string
  category: string
  price: number
  compareAt?: number
  emoji: string
  from: string
  to: string
  rating: number
  reviewCount: number
  shortDesc: string
  veg: boolean
  spicy: 0 | 1 | 2
  popular: boolean
  tags: string[]
}

export const cuisines: Cuisine[] = [
  { slug: 'desi', name: 'Desi / BBQ', emoji: '🍢' },
  { slug: 'fastfood', name: 'Fast Food', emoji: '🍔' },
  { slug: 'pizza', name: 'Pizza', emoji: '🍕' },
  { slug: 'biryani', name: 'Biryani', emoji: '🍚' },
  { slug: 'chinese', name: 'Chinese', emoji: '🥡' },
  { slug: 'dessert', name: 'Desserts', emoji: '🍰' },
  { slug: 'beverages', name: 'Drinks & Juices', emoji: '🧃' },
  { slug: 'healthy', name: 'Healthy', emoji: '🥗' },
]

export const restaurants: Restaurant[] = [
  { slug: 'lahori-tikka-house', name: 'Lahori Tikka House', city: 'lahore', cuisine: ['desi', 'biryani'], rating: 4.7, ratingCount: 5400, verified: true, tagline: 'Charcoal BBQ & sizzling karahi', emoji: '🍢', from: '#c2410c', to: '#f59e0b', phone: '03001112233', deliveryMins: 35, deliveryFee: 99, minOrder: 500, priceTier: 2, open: true, badges: ['Verified', 'Top Rated'] },
  { slug: 'karachi-biryani-co', name: 'Karachi Biryani Co.', city: 'karachi', cuisine: ['biryani', 'desi'], rating: 4.8, ratingCount: 8900, verified: true, tagline: 'Authentic spicy Sindhi biryani', emoji: '🍚', from: '#b45309', to: '#dc2626', phone: '03002223344', deliveryMins: 30, deliveryFee: 79, minOrder: 400, priceTier: 1, open: true, badges: ['Verified', 'Bestseller'] },
  { slug: 'cheezy-slice', name: 'Cheezy Slice', city: 'lahore', cuisine: ['pizza', 'fastfood'], rating: 4.5, ratingCount: 3200, verified: true, tagline: 'Hand-tossed pizzas & loaded fries', emoji: '🍕', from: '#dc2626', to: '#f59e0b', phone: '03003334455', deliveryMins: 40, deliveryFee: 99, minOrder: 600, priceTier: 2, open: true, badges: ['Verified'] },
  { slug: 'burger-lab', name: 'Burger Lab', city: 'islamabad', cuisine: ['fastfood'], rating: 4.6, ratingCount: 4100, verified: true, tagline: 'Smashed patties, secret sauce', emoji: '🍔', from: '#b45309', to: '#ea580c', phone: '03004445566', deliveryMins: 30, deliveryFee: 89, minOrder: 500, priceTier: 2, open: true, badges: ['Verified', 'Trending'] },
  { slug: 'dragon-wok', name: 'Dragon Wok', city: 'karachi', cuisine: ['chinese'], rating: 4.4, ratingCount: 2100, verified: false, tagline: 'Wok-tossed Chinese favourites', emoji: '🥡', from: '#dc2626', to: '#7c3aed', phone: '03005556677', deliveryMins: 45, deliveryFee: 119, minOrder: 700, priceTier: 2, open: true, badges: [] },
  { slug: 'sweet-tooth', name: 'Sweet Tooth', city: 'lahore', cuisine: ['dessert', 'beverages'], rating: 4.9, ratingCount: 1800, verified: true, tagline: 'Cakes, brownies & cold coffee', emoji: '🍰', from: '#db2777', to: '#f59e0b', phone: '03006667788', deliveryMins: 35, deliveryFee: 99, minOrder: 400, priceTier: 2, open: true, badges: ['Verified', 'Top Rated'] },
  { slug: 'green-bowl', name: 'Green Bowl', city: 'islamabad', cuisine: ['healthy', 'beverages'], rating: 4.6, ratingCount: 1300, verified: true, tagline: 'Salads, wraps & fresh juices', emoji: '🥗', from: '#16a34a', to: '#84cc16', phone: '03007778899', deliveryMins: 30, deliveryFee: 89, minOrder: 500, priceTier: 2, open: true, badges: ['Verified', 'Healthy'] },
  { slug: 'chai-wala-junction', name: 'Chai Wala Junction', city: 'rawalpindi', cuisine: ['beverages', 'desi'], rating: 4.5, ratingCount: 2600, verified: false, tagline: 'Doodh patti, parathas & nashta', emoji: '🫖', from: '#92400e', to: '#16a34a', phone: '03008889900', deliveryMins: 25, deliveryFee: 59, minOrder: 250, priceTier: 1, open: false, badges: [] },
]

type DishSeed = Omit<Dish, 'emoji' | 'from' | 'to' | 'rating' | 'reviewCount' | 'veg' | 'spicy' | 'popular' | 'tags'> &
  Partial<Pick<Dish, 'emoji' | 'from' | 'to' | 'rating' | 'reviewCount' | 'veg' | 'spicy' | 'popular' | 'tags' | 'compareAt'>>

function dish(s: DishSeed): Dish {
  return {
    emoji: '🍽️', from: '#c2410c', to: '#f59e0b', rating: 4.5, reviewCount: 120,
    veg: false, spicy: 0, popular: false, tags: [],
    ...s,
  }
}

export const dishes: Dish[] = [
  // Lahori Tikka House
  dish({ slug: 'chicken-tikka', name: 'Chicken Tikka (Full)', restaurant: 'lahori-tikka-house', category: 'BBQ', price: 650, emoji: '🍗', rating: 4.8, reviewCount: 940, spicy: 1, popular: true, shortDesc: 'Charcoal-grilled, juicy and smoky.', tags: ['popular'] }),
  dish({ slug: 'seekh-kebab', name: 'Beef Seekh Kebab (4 pcs)', restaurant: 'lahori-tikka-house', category: 'BBQ', price: 550, emoji: '🍢', rating: 4.7, reviewCount: 610, spicy: 2, popular: true, shortDesc: 'Hand-minced spiced beef skewers.' }),
  dish({ slug: 'chicken-karahi-half', name: 'Chicken Karahi (Half)', restaurant: 'lahori-tikka-house', category: 'Karahi', price: 950, compareAt: 1150, emoji: '🍲', rating: 4.8, reviewCount: 780, spicy: 1, popular: true, shortDesc: 'Wok-cooked in tomatoes & green chili.', tags: ['deal'] }),
  dish({ slug: 'garlic-naan', name: 'Garlic Naan', restaurant: 'lahori-tikka-house', category: 'Breads', price: 90, emoji: '🫓', rating: 4.6, reviewCount: 300, veg: true, shortDesc: 'Tandoor-fresh, brushed with garlic butter.' }),
  // Karachi Biryani Co.
  dish({ slug: 'chicken-biryani', name: 'Chicken Biryani', restaurant: 'karachi-biryani-co', category: 'Biryani', price: 350, emoji: '🍚', rating: 4.8, reviewCount: 2100, spicy: 2, popular: true, shortDesc: 'Double masala, with raita & shami.', tags: ['popular', 'bestseller'] }),
  dish({ slug: 'beef-biryani', name: 'Beef Biryani', restaurant: 'karachi-biryani-co', category: 'Biryani', price: 420, emoji: '🍛', rating: 4.7, reviewCount: 1400, spicy: 2, popular: true, shortDesc: 'Tender beef, long-grain basmati.' }),
  dish({ slug: 'zinger-roll', name: 'Zinger Roll', restaurant: 'karachi-biryani-co', category: 'Sides', price: 280, emoji: '🌯', rating: 4.5, reviewCount: 520, spicy: 1, shortDesc: 'Crispy fillet, mayo & slaw in paratha.' }),
  // Cheezy Slice
  dish({ slug: 'chicken-fajita-pizza', name: 'Chicken Fajita Pizza (Med)', restaurant: 'cheezy-slice', category: 'Pizza', price: 1150, compareAt: 1400, emoji: '🍕', rating: 4.6, reviewCount: 880, spicy: 1, popular: true, shortDesc: 'Loaded with fajita chicken & peppers.', tags: ['deal', 'popular'] }),
  dish({ slug: 'loaded-fries', name: 'Loaded Cheese Fries', restaurant: 'cheezy-slice', category: 'Sides', price: 450, emoji: '🍟', rating: 4.4, reviewCount: 410, veg: true, shortDesc: 'Fries smothered in cheese sauce.' }),
  dish({ slug: 'garlic-bread', name: 'Garlic Bread Supreme', restaurant: 'cheezy-slice', category: 'Sides', price: 380, emoji: '🥖', rating: 4.3, reviewCount: 260, veg: true, shortDesc: 'Cheesy, herby, oven-baked.' }),
  // Burger Lab
  dish({ slug: 'classic-smash', name: 'Classic Smash Burger', restaurant: 'burger-lab', category: 'Burgers', price: 590, emoji: '🍔', rating: 4.7, reviewCount: 1200, popular: true, shortDesc: 'Double smashed patty, secret sauce.', tags: ['popular'] }),
  dish({ slug: 'crispy-chicken-burger', name: 'Crispy Chicken Burger', restaurant: 'burger-lab', category: 'Burgers', price: 560, emoji: '🍔', rating: 4.6, reviewCount: 760, spicy: 1, shortDesc: 'Buttermilk-fried fillet, pickles.' }),
  dish({ slug: 'loaded-nuggets', name: 'Loaded Nuggets (8)', restaurant: 'burger-lab', category: 'Sides', price: 420, emoji: '🍗', rating: 4.4, reviewCount: 340, shortDesc: 'Crunchy nuggets with dips.' }),
  // Dragon Wok
  dish({ slug: 'chicken-chowmein', name: 'Chicken Chow Mein', restaurant: 'dragon-wok', category: 'Noodles', price: 680, emoji: '🍜', rating: 4.5, reviewCount: 430, spicy: 1, popular: true, shortDesc: 'Wok-tossed noodles & veggies.' }),
  dish({ slug: 'kung-pao', name: 'Kung Pao Chicken', restaurant: 'dragon-wok', category: 'Main', price: 820, emoji: '🥡', rating: 4.4, reviewCount: 290, spicy: 2, shortDesc: 'Spicy, peanutty, classic Szechuan.' }),
  // Sweet Tooth
  dish({ slug: 'chocolate-fudge-cake', name: 'Chocolate Fudge Cake (slice)', restaurant: 'sweet-tooth', category: 'Cakes', price: 450, emoji: '🍰', rating: 4.9, reviewCount: 620, veg: true, popular: true, shortDesc: 'Rich, molten, melt-in-mouth.', tags: ['popular'] }),
  dish({ slug: 'cold-coffee', name: 'Cold Coffee', restaurant: 'sweet-tooth', category: 'Drinks', price: 320, emoji: '🥤', rating: 4.7, reviewCount: 510, veg: true, shortDesc: 'Thick, creamy, double-shot.' }),
  dish({ slug: 'brownie-box', name: 'Fudgy Brownie Box (6)', restaurant: 'sweet-tooth', category: 'Cakes', price: 850, compareAt: 1050, emoji: '🍫', rating: 4.8, reviewCount: 280, veg: true, shortDesc: 'Gooey center, crackly top.', tags: ['deal'] }),
  // Green Bowl
  dish({ slug: 'grilled-chicken-salad', name: 'Grilled Chicken Salad', restaurant: 'green-bowl', category: 'Salads', price: 620, emoji: '🥗', rating: 4.6, reviewCount: 330, popular: true, shortDesc: 'Greens, grilled chicken, vinaigrette.', tags: ['popular', 'healthy'] }),
  dish({ slug: 'detox-juice', name: 'Detox Green Juice', restaurant: 'green-bowl', category: 'Juices', price: 350, emoji: '🧃', rating: 4.5, reviewCount: 190, veg: true, shortDesc: 'Cucumber, apple, mint, lemon.' }),
  // Chai Wala Junction
  dish({ slug: 'doodh-patti', name: 'Doodh Patti Chai', restaurant: 'chai-wala-junction', category: 'Chai', price: 120, emoji: '🫖', rating: 4.6, reviewCount: 540, veg: true, popular: true, shortDesc: 'Strong, milky, dhaba-style.', tags: ['popular'] }),
  dish({ slug: 'aloo-paratha', name: 'Aloo Paratha', restaurant: 'chai-wala-junction', category: 'Nashta', price: 180, emoji: '🫓', rating: 4.5, reviewCount: 410, veg: true, spicy: 1, shortDesc: 'Crispy stuffed paratha with achar.' }),
]
