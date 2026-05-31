import type { Category, City, Product, Review, Shop, VariantGroup } from './types'

/* ------------------------------------------------------------------ */
/* Cities                                                              */
/* ------------------------------------------------------------------ */

export const cities: City[] = [
  { slug: 'karachi', name: 'Karachi', province: 'Sindh', popular: true },
  { slug: 'lahore', name: 'Lahore', province: 'Punjab', popular: true },
  { slug: 'islamabad', name: 'Islamabad', province: 'ICT', popular: true },
  { slug: 'rawalpindi', name: 'Rawalpindi', province: 'Punjab', popular: true },
  { slug: 'faisalabad', name: 'Faisalabad', province: 'Punjab', popular: true },
  { slug: 'multan', name: 'Multan', province: 'Punjab', popular: true },
  { slug: 'peshawar', name: 'Peshawar', province: 'KPK', popular: true },
  { slug: 'quetta', name: 'Quetta', province: 'Balochistan', popular: true },
  { slug: 'hyderabad', name: 'Hyderabad', province: 'Sindh', popular: false },
  { slug: 'sialkot', name: 'Sialkot', province: 'Punjab', popular: false },
  { slug: 'gujranwala', name: 'Gujranwala', province: 'Punjab', popular: false },
  { slug: 'bahawalpur', name: 'Bahawalpur', province: 'Punjab', popular: false },
  { slug: 'sargodha', name: 'Sargodha', province: 'Punjab', popular: false },
  { slug: 'abbottabad', name: 'Abbottabad', province: 'KPK', popular: false },
  { slug: 'sukkur', name: 'Sukkur', province: 'Sindh', popular: false },
]

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export const categories: Category[] = [
  { slug: 'electronics', name: 'Electronics', icon: 'Cpu', blurb: 'Gadgets, audio & tech', from: '#0ea5e9', to: '#6366f1' },
  { slug: 'mobile', name: 'Mobiles & Tablets', icon: 'Smartphone', blurb: 'Phones, tablets & more', from: '#6366f1', to: '#a855f7' },
  { slug: 'fashion', name: 'Fashion & Apparel', icon: 'Shirt', blurb: 'Eastern & western wear', from: '#ec4899', to: '#f97316' },
  { slug: 'grocery', name: 'Grocery & Essentials', icon: 'ShoppingBasket', blurb: 'Pantry staples, fast', from: '#84cc16', to: '#16a34a' },
  { slug: 'home', name: 'Home & Living', icon: 'Sofa', blurb: 'Make any space cozy', from: '#14b8a6', to: '#22c55e' },
  { slug: 'beauty', name: 'Beauty & Care', icon: 'Sparkles', blurb: 'Glow & self-care', from: '#f43f5e', to: '#a855f7' },
  { slug: 'appliances', name: 'Appliances', icon: 'Refrigerator', blurb: 'For every home', from: '#64748b', to: '#0f172a' },
  { slug: 'books', name: 'Books & Stationery', icon: 'BookOpen', blurb: 'Read, learn, create', from: '#8b5cf6', to: '#6366f1' },
]

/* ------------------------------------------------------------------ */
/* Shops                                                               */
/* ------------------------------------------------------------------ */

export const shops: Shop[] = [
  { slug: 'karachi-electronics-hub', name: 'Karachi Electronics Hub', city: 'karachi', category: 'electronics', delivery: 'pakistan', rating: 4.7, ratingCount: 1840, verified: true, tagline: 'Genuine gadgets with local warranty', emoji: '🔌', from: '#0284c7', to: '#4f46e5', phone: '03001234567', followers: 12400, responseRate: 98, joinedDays: 240, badges: ['Verified', 'Fast Shipping'] },
  { slug: 'gulberg-mobile-zone', name: 'Gulberg Mobile Zone', city: 'lahore', category: 'mobile', delivery: 'pakistan', rating: 4.6, ratingCount: 2310, verified: true, tagline: 'Latest phones at honest prices', emoji: '📱', from: '#6366f1', to: '#a855f7', phone: '03007654321', followers: 21800, responseRate: 97, joinedDays: 410, badges: ['Verified', 'Top Seller'] },
  { slug: 'lahore-fashion-house', name: 'Lahore Fashion House', city: 'lahore', category: 'fashion', delivery: 'pakistan', rating: 4.5, ratingCount: 1620, verified: true, tagline: 'Trendy outfits delivered nationwide', emoji: '🧵', from: '#db2777', to: '#f97316', phone: '03009876543', followers: 9800, responseRate: 96, joinedDays: 320, badges: ['Verified'] },
  { slug: 'peshawar-threads', name: 'Peshawar Threads', city: 'peshawar', category: 'fashion', delivery: 'city', deliversTo: ['islamabad', 'rawalpindi'], rating: 4.4, ratingCount: 540, verified: false, tagline: 'Handmade waistcoats & chappals', emoji: '🥿', from: '#b45309', to: '#16a34a', phone: '03110223344', followers: 3100, responseRate: 92, joinedDays: 120, badges: [] },
  { slug: 'islamabad-grocery-mart', name: 'Islamabad Grocery Mart', city: 'islamabad', category: 'grocery', delivery: 'city', deliversTo: ['rawalpindi'], rating: 4.3, ratingCount: 980, verified: true, tagline: 'Fresh groceries at your doorstep', emoji: '🛒', from: '#16a34a', to: '#84cc16', phone: '03331122334', followers: 5600, responseRate: 99, joinedDays: 90, badges: ['Verified', 'Same-Day'] },
  { slug: 'multan-mango-mart', name: 'Multan Mango Mart', city: 'multan', category: 'grocery', delivery: 'pakistan', rating: 4.8, ratingCount: 760, verified: true, tagline: 'Sunshine fruit & pantry staples', emoji: '🥭', from: '#f59e0b', to: '#16a34a', phone: '03219988776', followers: 7200, responseRate: 98, joinedDays: 180, badges: ['Verified', 'Seasonal'] },
  { slug: 'clifton-home-living', name: 'Clifton Home & Living', city: 'karachi', category: 'home', delivery: 'pakistan', rating: 4.6, ratingCount: 690, verified: true, tagline: 'Cozy upgrades for every room', emoji: '🛋️', from: '#0d9488', to: '#22c55e', phone: '03002223344', followers: 6400, responseRate: 97, joinedDays: 260, badges: ['Verified'] },
  { slug: 'pindi-beauty-bar', name: 'Pindi Beauty Bar', city: 'rawalpindi', category: 'beauty', delivery: 'city', deliversTo: ['islamabad'], rating: 4.7, ratingCount: 1320, verified: true, tagline: 'Clean beauty that loves your skin', emoji: '💄', from: '#e11d48', to: '#a855f7', phone: '03445566778', followers: 14200, responseRate: 96, joinedDays: 200, badges: ['Verified', 'Trending'] },
  { slug: 'faisalabad-appliances', name: 'Faisalabad Appliances', city: 'faisalabad', category: 'appliances', delivery: 'pakistan', rating: 4.5, ratingCount: 880, verified: true, tagline: 'Big-name appliances, small prices', emoji: '🧺', from: '#475569', to: '#0ea5e9', phone: '03116677889', followers: 4900, responseRate: 95, joinedDays: 300, badges: ['Verified', 'Installments'] },
  { slug: 'saddar-book-depot', name: 'Saddar Book Depot', city: 'karachi', category: 'books', delivery: 'pakistan', rating: 4.9, ratingCount: 430, verified: true, tagline: 'Books, notes & stationery', emoji: '📚', from: '#7c3aed', to: '#4f46e5', phone: '03008899001', followers: 3800, responseRate: 99, joinedDays: 360, badges: ['Verified', 'Editor Picks'] },
]

/* ------------------------------------------------------------------ */
/* Product builder                                                     */
/* ------------------------------------------------------------------ */

const SWATCH: Record<string, string> = {
  Black: '#1f2937', White: '#f3f4f6', Blue: '#1e3a8a', Green: '#166534', Maroon: '#7f1d1d',
  Grey: '#6b7280', Gold: '#d39a23', Silver: '#cbd5e1', Pink: '#f9a8d4', Cream: '#f5efe0',
  Navy: '#1e293b', Mustard: '#d39a23', Teal: '#0d9488', Rust: '#c2643f',
}

function swatches(...names: string[]): VariantGroup {
  return { name: 'Color', type: 'swatch', options: names.map((n) => ({ value: n, swatch: SWATCH[n] ?? '#9ca3af' })) }
}

const APPAREL_SIZES: VariantGroup = {
  name: 'Size',
  type: 'pill',
  options: ['S', 'M', 'L', 'XL', 'XXL'].map((v) => ({ value: v, soldOut: v === 'XXL' })),
}

const STORAGE_64_256: VariantGroup = {
  name: 'Storage',
  type: 'pill',
  options: [
    { value: '64GB' },
    { value: '128GB', deltaRupees: 8000 },
    { value: '256GB', deltaRupees: 18000 },
  ],
}

type Seed = {
  slug: string; name: string; shop: string; category: string
  price: number; compareAt?: number
  emoji: string; from: string; to: string
  rating: number; reviewCount: number; sold: number; stock: number
  tags?: string[]; freeShipping?: boolean
  shortDesc: string; description?: string
  highlights?: string[]; specs?: { label: string; value: string }[]
  variantGroups?: VariantGroup[]; pairsWith?: string[]; createdDaysAgo?: number
}

const HL: Record<string, string[]> = {
  electronics: ['Genuine with local warranty', 'Tested before dispatch', 'Cash on delivery available', '7-day easy return'],
  mobile: ['PTA-approved, sealed box', 'Official warranty', 'Free screen protector', 'Cash on delivery available'],
  fashion: ['Premium stitched fabric', 'True-to-size fit', 'Colours stay after wash', 'Exchange within 7 days'],
  grocery: ['Fresh stock, sealed', 'No artificial additives', 'Same-day in select cities', 'Quality checked'],
  home: ['Sturdy, easy to clean', 'Fits modern homes', 'Carefully packed', 'Cash on delivery available'],
  beauty: ['Dermatologist tested', 'Cruelty-free', 'For all skin types', 'Sealed & authentic'],
  appliances: ['Brand warranty included', 'Installation guide', 'Easy installments', 'Tested for voltage stability'],
  books: ['Original print', 'Protected packaging', 'Great gift pick', 'Fast nationwide delivery'],
}

const SP: Record<string, { label: string; value: string }[]> = {
  electronics: [{ label: 'Warranty', value: '12 months' }, { label: 'Condition', value: 'Brand new' }, { label: 'Box', value: 'Sealed' }],
  mobile: [{ label: 'Warranty', value: 'Official 1 year' }, { label: 'PTA', value: 'Approved' }, { label: 'SIM', value: 'Dual' }],
  fashion: [{ label: 'Fabric', value: 'Premium blend' }, { label: 'Care', value: 'Machine wash' }, { label: 'Fit', value: 'Regular' }],
  grocery: [{ label: 'Packing', value: 'Sealed' }, { label: 'Storage', value: 'Cool & dry' }, { label: 'Origin', value: 'Pakistan' }],
  home: [{ label: 'Material', value: 'Premium' }, { label: 'Care', value: 'Wipe clean' }, { label: 'Assembly', value: 'Minimal' }],
  beauty: [{ label: 'Type', value: 'All skin' }, { label: 'Formula', value: 'Clean' }, { label: 'Made in', value: 'Imported' }],
  appliances: [{ label: 'Warranty', value: 'Brand 1 year' }, { label: 'Voltage', value: '220V' }, { label: 'Install', value: 'Guided' }],
  books: [{ label: 'Format', value: 'Paperback' }, { label: 'Language', value: 'English/Urdu' }, { label: 'Condition', value: 'New' }],
}

function build(s: Seed): Product {
  return {
    slug: s.slug, name: s.name, shop: s.shop, category: s.category,
    price: s.price, compareAt: s.compareAt,
    emoji: s.emoji, from: s.from, to: s.to,
    rating: s.rating, reviewCount: s.reviewCount, sold: s.sold, stock: s.stock,
    freeShipping: s.freeShipping ?? s.price >= 2500,
    tags: s.tags ?? [],
    shortDesc: s.shortDesc,
    description: s.description ?? `${s.name} — ${s.shortDesc} Quality-checked before dispatch and backed by easy returns. Thousands of happy customers across Pakistan.`,
    highlights: s.highlights ?? HL[s.category] ?? HL.electronics,
    specs: s.specs ?? SP[s.category] ?? SP.electronics,
    variantGroups: s.variantGroups,
    pairsWith: s.pairsWith,
    createdDaysAgo: s.createdDaysAgo ?? 45,
  }
}

/* ------------------------------------------------------------------ */
/* Products (prices in PKR)                                            */
/* ------------------------------------------------------------------ */

const seeds: Seed[] = [
  /* Karachi Electronics Hub */
  { slug: 'sony-wh-1000xm4', name: 'Sony WH-1000XM4 Headphones', shop: 'karachi-electronics-hub', category: 'electronics', price: 69999, compareAt: 84999, emoji: '🎧', from: '#0284c7', to: '#6366f1', rating: 4.8, reviewCount: 412, sold: 2300, stock: 14, tags: ['bestseller', 'flash', 'trending'], shortDesc: 'Industry-leading noise cancelling wireless headphones.', variantGroups: [swatches('Black', 'Silver')], pairsWith: ['anker-powerbank-20k', 'tp-link-router-ac1200'], createdDaysAgo: 18 },
  { slug: 'anker-powerbank-20k', name: 'Anker PowerBank 20000mAh', shop: 'karachi-electronics-hub', category: 'electronics', price: 8999, compareAt: 11999, emoji: '🔋', from: '#0ea5e9', to: '#14b8a6', rating: 4.5, reviewCount: 880, sold: 9400, stock: 60, tags: ['bestseller', 'flash'], shortDesc: 'High-capacity fast-charge power bank.', createdDaysAgo: 30 },
  { slug: 'logitech-mx-master-3', name: 'Logitech MX Master 3', shop: 'karachi-electronics-hub', category: 'electronics', price: 27999, emoji: '🖱️', from: '#1e293b', to: '#6366f1', rating: 4.7, reviewCount: 233, sold: 1700, stock: 0, tags: ['editor'], shortDesc: 'Advanced wireless mouse for power users.', createdDaysAgo: 90 },
  { slug: 'tp-link-router-ac1200', name: 'TP-Link Router AC1200', shop: 'karachi-electronics-hub', category: 'electronics', price: 6499, compareAt: 7999, emoji: '📶', from: '#0369a1', to: '#22c55e', rating: 4.2, reviewCount: 540, sold: 6100, stock: 90, tags: ['flash'], shortDesc: 'Dual-band WiFi router for fast home internet.', createdDaysAgo: 55 },
  { slug: 'jbl-flip-6', name: 'JBL Flip 6 Speaker', shop: 'karachi-electronics-hub', category: 'electronics', price: 32999, compareAt: 37999, emoji: '🔊', from: '#4f46e5', to: '#ec4899', rating: 4.6, reviewCount: 320, sold: 2800, stock: 22, tags: ['trending', 'flash'], shortDesc: 'Waterproof portable speaker with bold bass.', variantGroups: [swatches('Black', 'Blue', 'Pink')], createdDaysAgo: 25 },
  { slug: 'hp-pavilion-15', name: 'HP Pavilion 15 Laptop', shop: 'karachi-electronics-hub', category: 'electronics', price: 184999, compareAt: 209999, emoji: '💻', from: '#1e3a8a', to: '#0ea5e9', rating: 4.4, reviewCount: 188, sold: 740, stock: 6, tags: ['editor'], shortDesc: 'Reliable laptop for work & study, 11th Gen Intel.', createdDaysAgo: 70 },

  /* Gulberg Mobile Zone */
  { slug: 'samsung-galaxy-a54', name: 'Samsung Galaxy A54 5G', shop: 'gulberg-mobile-zone', category: 'mobile', price: 124999, compareAt: 139999, emoji: '📱', from: '#6366f1', to: '#0ea5e9', rating: 4.6, reviewCount: 610, sold: 3300, stock: 18, tags: ['bestseller', 'flash', 'trending'], shortDesc: 'AMOLED display, 50MP camera, all-day battery.', variantGroups: [swatches('Black', 'White', 'Green'), STORAGE_64_256], pairsWith: ['xiaomi-buds-4', 'phone-case-clear'], createdDaysAgo: 20 },
  { slug: 'redmi-note-13', name: 'Redmi Note 13', shop: 'gulberg-mobile-zone', category: 'mobile', price: 54999, compareAt: 62999, emoji: '📲', from: '#f97316', to: '#6366f1', rating: 4.5, reviewCount: 920, sold: 7800, stock: 40, tags: ['bestseller', 'flash'], shortDesc: 'Big battery, fast charge, crisp 120Hz screen.', variantGroups: [swatches('Blue', 'Black'), STORAGE_64_256], createdDaysAgo: 28 },
  { slug: 'xiaomi-buds-4', name: 'Xiaomi Buds 4 Lite', shop: 'gulberg-mobile-zone', category: 'mobile', price: 6499, compareAt: 8499, emoji: '🎧', from: '#a855f7', to: '#6366f1', rating: 4.3, reviewCount: 460, sold: 11200, stock: 120, tags: ['flash'], shortDesc: 'Lightweight earbuds with punchy sound.', createdDaysAgo: 35 },
  { slug: 'phone-case-clear', name: 'Shockproof Clear Case', shop: 'gulberg-mobile-zone', category: 'mobile', price: 999, emoji: '🛡️', from: '#64748b', to: '#0f172a', rating: 4.2, reviewCount: 1503, sold: 24000, stock: 300, tags: [], shortDesc: 'Drop-tested clear case that never yellows.', freeShipping: false, createdDaysAgo: 80 },
  { slug: 'ipad-10th-gen', name: 'iPad 10th Gen 64GB', shop: 'gulberg-mobile-zone', category: 'mobile', price: 144999, compareAt: 159999, emoji: '📟', from: '#0ea5e9', to: '#a855f7', rating: 4.7, reviewCount: 150, sold: 620, stock: 9, tags: ['editor', 'trending'], shortDesc: 'Big, bright Liquid Retina display for work & play.', createdDaysAgo: 22 },
  { slug: 'fast-charger-33w', name: '33W Fast Charger', shop: 'gulberg-mobile-zone', category: 'mobile', price: 1799, compareAt: 2499, emoji: '🔌', from: '#22c55e', to: '#0ea5e9', rating: 4.4, reviewCount: 770, sold: 15400, stock: 200, tags: ['flash'], shortDesc: 'Charge to 50% in 25 minutes.', freeShipping: false, createdDaysAgo: 40 },

  /* Lahore Fashion House */
  { slug: 'womens-lawn-suit-3pc', name: "Women's Lawn Suit 3-Piece", shop: 'lahore-fashion-house', category: 'fashion', price: 4999, compareAt: 6999, emoji: '👗', from: '#db2777', to: '#a855f7', rating: 4.6, reviewCount: 540, sold: 6200, stock: 35, tags: ['bestseller', 'flash', 'trending'], shortDesc: 'Premium unstitched lawn with intricate prints.', variantGroups: [swatches('Pink', 'Teal', 'Cream'), APPAREL_SIZES], pairsWith: ['embroidered-dupatta', 'leather-jutti'], createdDaysAgo: 16 },
  { slug: 'mens-cotton-kurta', name: "Men's Cotton Kurta", shop: 'lahore-fashion-house', category: 'fashion', price: 3499, compareAt: 4299, emoji: '👕', from: '#0d9488', to: '#84cc16', rating: 4.3, reviewCount: 880, sold: 9100, stock: 50, tags: ['bestseller'], shortDesc: 'Breathable kurta for everyday & festive wear.', variantGroups: [swatches('White', 'Navy', 'Maroon'), APPAREL_SIZES], createdDaysAgo: 50 },
  { slug: 'leather-jutti', name: 'Handmade Leather Jutti', shop: 'lahore-fashion-house', category: 'fashion', price: 2499, emoji: '🥿', from: '#b45309', to: '#d39a23', rating: 4.4, reviewCount: 305, sold: 4100, stock: 60, tags: ['new'], shortDesc: 'Traditional handcrafted leather footwear.', variantGroups: [swatches('Gold', 'Maroon', 'Cream')], createdDaysAgo: 12 },
  { slug: 'embroidered-dupatta', name: 'Embroidered Dupatta', shop: 'lahore-fashion-house', category: 'fashion', price: 1899, compareAt: 2499, emoji: '🧣', from: '#ec4899', to: '#f97316', rating: 4.1, reviewCount: 261, sold: 5300, stock: 8, tags: ['flash'], shortDesc: 'Elegant embroidered dupatta to complete your look.', freeShipping: false, createdDaysAgo: 33 },
  { slug: 'casual-sneakers', name: 'Casual Sneakers', shop: 'lahore-fashion-house', category: 'fashion', price: 5499, compareAt: 6999, emoji: '👟', from: '#f43f5e', to: '#f59e0b', rating: 4.5, reviewCount: 410, sold: 3800, stock: 28, tags: ['trending'], shortDesc: 'Lightweight everyday sneakers, cushioned sole.', variantGroups: [swatches('White', 'Black', 'Grey')], createdDaysAgo: 24 },

  /* Peshawar Threads */
  { slug: 'kpk-waistcoat', name: 'Handmade Waistcoat', shop: 'peshawar-threads', category: 'fashion', price: 3999, compareAt: 4999, emoji: '🦺', from: '#b45309', to: '#166534', rating: 4.6, reviewCount: 120, sold: 900, stock: 20, tags: ['new', 'editor'], shortDesc: 'Hand-stitched waistcoat in classic cuts.', variantGroups: [swatches('Black', 'Navy', 'Cream'), APPAREL_SIZES], createdDaysAgo: 9 },
  { slug: 'peshawari-chappal', name: 'Peshawari Chappal', shop: 'peshawar-threads', category: 'fashion', price: 2899, emoji: '🩴', from: '#92400e', to: '#b45309', rating: 4.7, reviewCount: 240, sold: 2600, stock: 45, tags: ['bestseller', 'trending'], shortDesc: 'Genuine leather chappal, built to last years.', variantGroups: [swatches('Gold', 'Black', 'Maroon')], createdDaysAgo: 26 },
  { slug: 'wool-shawl', name: 'Pure Wool Shawl', shop: 'peshawar-threads', category: 'fashion', price: 4499, compareAt: 5999, emoji: '🧶', from: '#7f1d1d', to: '#b45309', rating: 4.5, reviewCount: 88, sold: 700, stock: 4, tags: ['flash'], shortDesc: 'Warm, soft shawl for chilly evenings.', variantGroups: [swatches('Maroon', 'Grey', 'Cream')], createdDaysAgo: 6 },

  /* Islamabad Grocery Mart */
  { slug: 'basmati-rice-5kg', name: 'Basmati Rice 5kg', shop: 'islamabad-grocery-mart', category: 'grocery', price: 2499, compareAt: 2999, emoji: '🍚', from: '#16a34a', to: '#84cc16', rating: 4.5, reviewCount: 430, sold: 7300, stock: 80, tags: ['bestseller', 'flash'], shortDesc: 'Premium long-grain basmati rice.', pairsWith: ['cooking-oil-5l', 'tea-950g'], createdDaysAgo: 18 },
  { slug: 'cooking-oil-5l', name: 'Cooking Oil 5L', shop: 'islamabad-grocery-mart', category: 'grocery', price: 3299, emoji: '🫗', from: '#65a30d', to: '#d39a23', rating: 4.3, reviewCount: 388, sold: 6100, stock: 70, tags: [], shortDesc: 'Pure cooking oil for everyday meals.', createdDaysAgo: 55 },
  { slug: 'tea-950g', name: 'Tapal Danedar Tea 950g', shop: 'islamabad-grocery-mart', category: 'grocery', price: 1899, compareAt: 2199, emoji: '🍵', from: '#713f12', to: '#16a34a', rating: 4.6, reviewCount: 910, sold: 12300, stock: 130, tags: ['bestseller', 'flash'], shortDesc: 'Rich and refreshing black tea.', freeShipping: false, createdDaysAgo: 37 },
  { slug: 'wheat-flour-10kg', name: 'Wheat Flour (Atta) 10kg', shop: 'islamabad-grocery-mart', category: 'grocery', price: 1499, emoji: '🌾', from: '#a3e635', to: '#16a34a', rating: 4.4, reviewCount: 277, sold: 4300, stock: 3, tags: [], shortDesc: 'Fine quality wheat flour for fresh rotis.', freeShipping: false, createdDaysAgo: 10 },
  { slug: 'sugar-5kg', name: 'Refined Sugar 5kg', shop: 'islamabad-grocery-mart', category: 'grocery', price: 999, emoji: '🧂', from: '#e5e7eb', to: '#84cc16', rating: 4.2, reviewCount: 188, sold: 5100, stock: 90, tags: [], shortDesc: 'Pure refined white sugar.', freeShipping: false, createdDaysAgo: 65 },

  /* Multan Mango Mart */
  { slug: 'chaunsa-mango-5kg', name: 'Chaunsa Mango 5kg', shop: 'multan-mango-mart', category: 'grocery', price: 1999, compareAt: 2699, emoji: '🥭', from: '#f59e0b', to: '#16a34a', rating: 4.9, reviewCount: 520, sold: 8800, stock: 24, tags: ['bestseller', 'flash', 'trending'], shortDesc: 'Sweet, juicy Chaunsa — straight from the orchard.', pairsWith: ['raw-honey-1kg', 'dry-dates-1kg'], createdDaysAgo: 8 },
  { slug: 'raw-honey-1kg', name: 'Raw Wildflower Honey 1kg', shop: 'multan-mango-mart', category: 'grocery', price: 1799, emoji: '🍯', from: '#d39a23', to: '#65a30d', rating: 4.7, reviewCount: 240, sold: 3400, stock: 60, tags: ['new'], shortDesc: 'Unfiltered honey straight from the hive.', createdDaysAgo: 14 },
  { slug: 'dry-dates-1kg', name: 'Premium Dry Dates 1kg', shop: 'multan-mango-mart', category: 'grocery', price: 1299, compareAt: 1699, emoji: '🌰', from: '#92400e', to: '#16a34a', rating: 4.6, reviewCount: 180, sold: 4200, stock: 110, tags: ['flash'], shortDesc: 'Naturally sweet, energy-packed dates.', freeShipping: false, createdDaysAgo: 41 },
  { slug: 'dry-fruits-mix-1kg', name: 'Dry Fruits Mix 1kg', shop: 'multan-mango-mart', category: 'grocery', price: 4999, compareAt: 5999, emoji: '🥜', from: '#b45309', to: '#16a34a', rating: 4.7, reviewCount: 150, sold: 2100, stock: 30, tags: ['editor'], shortDesc: 'Premium assorted dry fruits — perfect gift.', createdDaysAgo: 30 },

  /* Clifton Home & Living */
  { slug: 'cloud-throw-blanket', name: 'Cloud Throw Blanket', shop: 'clifton-home-living', category: 'home', price: 3999, compareAt: 5499, emoji: '🛌', from: '#14b8a6', to: '#22c55e', rating: 4.8, reviewCount: 320, sold: 4300, stock: 5, tags: ['bestseller', 'flash'], shortDesc: 'Ultra-soft throw for cosy winter evenings.', variantGroups: [swatches('Cream', 'Grey', 'Teal')], pairsWith: ['aroma-candle', 'stoneware-mug-set'], createdDaysAgo: 18 },
  { slug: 'aroma-candle', name: 'Scented Soy Candle', shop: 'clifton-home-living', category: 'home', price: 1499, emoji: '🕯️', from: '#0d9488', to: '#65a30d', rating: 4.7, reviewCount: 410, sold: 7700, stock: 120, tags: ['bestseller'], shortDesc: 'Clean-burning candle, 40-hour glow.', freeShipping: false, createdDaysAgo: 55 },
  { slug: 'stoneware-mug-set', name: 'Stoneware Mug Set (4)', shop: 'clifton-home-living', category: 'home', price: 2999, compareAt: 3799, emoji: '☕', from: '#0f766e', to: '#16a34a', rating: 4.5, reviewCount: 188, sold: 2600, stock: 40, tags: ['flash'], shortDesc: 'Hand-glazed mugs that keep chai hot longer.', createdDaysAgo: 65 },
  { slug: 'led-floor-lamp', name: 'Ambient LED Floor Lamp', shop: 'clifton-home-living', category: 'home', price: 6499, compareAt: 8499, emoji: '💡', from: '#0e7490', to: '#22c55e', rating: 4.7, reviewCount: 96, sold: 1100, stock: 14, tags: ['flash', 'trending'], shortDesc: 'Dimmable lamp, warm-to-cool tunable light.', createdDaysAgo: 30 },
  { slug: 'ceramic-planter', name: 'Terra Ceramic Planter', shop: 'clifton-home-living', category: 'home', price: 2299, emoji: '🪴', from: '#16a34a', to: '#84cc16', rating: 4.6, reviewCount: 130, sold: 3300, stock: 90, tags: ['new'], shortDesc: 'Self-draining planter that helps plants thrive.', variantGroups: [swatches('Cream', 'Rust', 'Teal')], createdDaysAgo: 11 },

  /* Pindi Beauty Bar */
  { slug: 'vitamin-c-serum', name: 'Dewy Vitamin C Serum', shop: 'pindi-beauty-bar', category: 'beauty', price: 2899, compareAt: 3900, emoji: '🧴', from: '#f43f5e', to: '#a855f7', rating: 4.8, reviewCount: 1120, sold: 18000, stock: 60, tags: ['bestseller', 'flash', 'trending'], shortDesc: 'Brightening serum for a visible glow in 2 weeks.', pairsWith: ['day-moisturizer-spf', 'matte-lipstick'], createdDaysAgo: 16 },
  { slug: 'day-moisturizer-spf', name: 'Day Moisturizer SPF30', shop: 'pindi-beauty-bar', category: 'beauty', price: 2499, emoji: '🥛', from: '#ec4899', to: '#8b5cf6', rating: 4.7, reviewCount: 840, sold: 9500, stock: 75, tags: ['bestseller'], shortDesc: 'Lightweight SPF that never feels greasy.', createdDaysAgo: 48 },
  { slug: 'matte-lipstick', name: 'Velvet Matte Lipstick', shop: 'pindi-beauty-bar', category: 'beauty', price: 1499, compareAt: 1999, emoji: '💋', from: '#e11d48', to: '#be123c', rating: 4.6, reviewCount: 2210, sold: 23000, stock: 2, tags: ['flash', 'bestseller'], shortDesc: 'All-day matte colour that won’t dry your lips.', variantGroups: [swatches('Maroon', 'Pink', 'Rust')], freeShipping: false, createdDaysAgo: 33 },
  { slug: 'argan-hair-oil', name: 'Argan Hair Oil', shop: 'pindi-beauty-bar', category: 'beauty', price: 1899, compareAt: 2499, emoji: '🌿', from: '#a855f7', to: '#16a34a', rating: 4.9, reviewCount: 540, sold: 6200, stock: 18, tags: ['editor', 'new'], shortDesc: 'Nourishing oil for shiny, frizz-free hair.', createdDaysAgo: 9 },

  /* Faisalabad Appliances */
  { slug: 'air-fryer-5l', name: 'Digital Air Fryer 5L', shop: 'faisalabad-appliances', category: 'appliances', price: 18999, compareAt: 23999, emoji: '🍟', from: '#475569', to: '#0ea5e9', rating: 4.6, reviewCount: 410, sold: 3100, stock: 22, tags: ['bestseller', 'flash', 'trending'], shortDesc: 'Crispy food with little to no oil.', pairsWith: ['electric-kettle', 'microwave-oven-20l'], createdDaysAgo: 20 },
  { slug: 'electric-kettle', name: 'Electric Kettle 1.8L', shop: 'faisalabad-appliances', category: 'appliances', price: 3499, compareAt: 4499, emoji: '🫖', from: '#64748b', to: '#0ea5e9', rating: 4.5, reviewCount: 690, sold: 8800, stock: 60, tags: ['bestseller', 'flash'], shortDesc: 'Boils in minutes with auto shut-off.', createdDaysAgo: 35 },
  { slug: 'microwave-oven-20l', name: 'Microwave Oven 20L', shop: 'faisalabad-appliances', category: 'appliances', price: 24999, compareAt: 29999, emoji: '📡', from: '#334155', to: '#0ea5e9', rating: 4.4, reviewCount: 220, sold: 1400, stock: 12, tags: ['editor'], shortDesc: 'Solo microwave with quick-heat presets.', createdDaysAgo: 70 },
  { slug: 'steam-iron', name: 'Steam Iron', shop: 'faisalabad-appliances', category: 'appliances', price: 4299, emoji: '🧺', from: '#475569', to: '#22c55e', rating: 4.3, reviewCount: 330, sold: 5200, stock: 85, tags: ['new'], shortDesc: 'Wrinkle-free clothes with powerful steam.', createdDaysAgo: 13 },

  /* Saddar Book Depot */
  { slug: 'atomic-habits', name: 'Atomic Habits — James Clear', shop: 'saddar-book-depot', category: 'books', price: 1499, compareAt: 1999, emoji: '📘', from: '#7c3aed', to: '#4f46e5', rating: 4.9, reviewCount: 920, sold: 11200, stock: 75, tags: ['bestseller', 'flash', 'trending'], shortDesc: 'Tiny changes, remarkable results.', pairsWith: ['the-alchemist', 'notebook-set'], createdDaysAgo: 21 },
  { slug: 'the-alchemist', name: 'The Alchemist — Paulo Coelho', shop: 'saddar-book-depot', category: 'books', price: 1199, emoji: '📗', from: '#6366f1', to: '#8b5cf6', rating: 4.8, reviewCount: 410, sold: 4800, stock: 40, tags: ['editor'], shortDesc: 'A timeless tale of following your dreams.', freeShipping: false, createdDaysAgo: 64 },
  { slug: 'notebook-set', name: 'Premium Notebook Set (3)', shop: 'saddar-book-depot', category: 'books', price: 999, compareAt: 1399, emoji: '📓', from: '#8b5cf6', to: '#ec4899', rating: 4.6, reviewCount: 530, sold: 6700, stock: 0, tags: ['flash'], shortDesc: 'Smooth-paper notebooks for notes & journaling.', freeShipping: false, createdDaysAgo: 39 },
  { slug: 'urdu-poetry-collection', name: 'Urdu Poetry Collection', shop: 'saddar-book-depot', category: 'books', price: 1699, emoji: '📕', from: '#4f46e5', to: '#06b6d4', rating: 4.7, reviewCount: 140, sold: 1900, stock: 55, tags: ['new'], shortDesc: 'Beloved ghazals & nazms in one volume.', freeShipping: false, createdDaysAgo: 7 },
]

export const products: Product[] = seeds.map(build)

/* ------------------------------------------------------------------ */
/* Reviews — deterministic, varied                                     */
/* ------------------------------------------------------------------ */

const AUTHORS = ['Ahmed R.', 'Sana K.', 'Bilal M.', 'Ayesha N.', 'Usman T.', 'Hira S.', 'Fahad A.', 'Maryam W.', 'Zain B.', 'Iqra H.', 'Omar F.', 'Nida E.']
const AVATARS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#a855f7', '#0ea5e9', '#ef4444', '#22c55e']
const TITLES = ['Bohat acha product', 'Worth the price', 'Exactly as shown', 'Highly recommended', 'Will order again', 'Solid quality', 'Pleasantly surprised', 'Great value']
const BODIES = [
  'Delivery was fast and the quality is genuinely better than I expected for the price. Recommended.',
  'Using it for a few weeks now, holds up great. Packaging was secure, nothing damaged.',
  'Looks even better in person. Seller responded quickly on WhatsApp too.',
  'Does exactly what it promises. Fair price and original product.',
  'Was a bit skeptical but it won me over. Cash on delivery made it easy.',
  'Great for the money. Took off one star only because I wanted more colour options.',
  'Bought as a gift and they loved it. Will definitely order from this shop again.',
  'Comfortable and durable, arrived earlier than estimated. Five stars.',
]
const DATES = ['2 days ago', '1 week ago', '2 weeks ago', '3 weeks ago', 'last month', '2 months ago']

function hash(seed: string, salt: number): number {
  let h = salt
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return h
}

function generateReviews(): Review[] {
  const out: Review[] = []
  for (const p of products) {
    const count = 3 + (hash(p.slug, 7) % 3)
    for (let i = 0; i < count; i++) {
      const h = hash(p.slug, i + 1)
      const stars = Math.max(3, Math.min(5, Math.round(p.rating) - (i === count - 1 ? 1 : 0)))
      out.push({
        id: `${p.slug}-r${i}`,
        productSlug: p.slug,
        author: AUTHORS[h % AUTHORS.length],
        avatarColor: AVATARS[(h >> 3) % AVATARS.length],
        rating: stars,
        date: DATES[(h >> 5) % DATES.length],
        title: TITLES[(h >> 7) % TITLES.length],
        body: BODIES[(h >> 9) % BODIES.length],
        helpful: 2 + ((h >> 11) % 40),
        verified: (h & 3) !== 0,
      })
    }
  }
  return out
}

export const reviews: Review[] = generateReviews()

/* ------------------------------------------------------------------ */
/* Payment + contact (from project brief)                              */
/* ------------------------------------------------------------------ */

export const PAYMENT = {
  bank: { bankName: 'Meezan Bank', accountTitle: 'Muhammad Khan', accountNumber: '00300112775116', iban: 'PK65MEZN0000300112775116' },
  easypaisa: { name: 'Muhammad Khan', number: '03242971964' },
  whatsapp: '03442015688',
}
