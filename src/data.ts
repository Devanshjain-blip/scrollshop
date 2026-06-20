export type Creator = {
  id: string
  username: string
  displayName: string
  avatar: string
  banner: string
  /** themed banner gradient stops (top -> bottom) */
  themeColor: string
  themeGradient: string
  followers: number
  verified: boolean
  bio: string
}

export type Product = {
  id: string
  name: string
  seller: string
  price: number
  image: string
}

export type CartItem = Product & { qty: number }

export type Reel = {
  id: string
  creatorId: string
  caption: string
  likes: string
  shares: string
  product: Product
  /** background image for the reel — distinct from the product photo */
  bg: string
  comments: Comment[]
}

export type Comment = {
  id: string
  user: string
  avatar: string
  text: string
  mine?: boolean
}

// ---- Product images (lifestyle shots / people wearing the item) ----
const IMG_KURTA = imgKurtaProduct
const IMG_DUPATTA = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'
const IMG_JUTTIS = 'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=800'
const IMG_EARRINGS = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800'

const IMG_SNEAKERS = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
const IMG_BACKPACK = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'
const IMG_WATCH = 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800'
const IMG_CAP = 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800'

const IMG_SERUM = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800'
const IMG_MOISTURIZER = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800'
const IMG_FACEWASH = 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800'
const IMG_LIPSTICK = 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800'

import imgKurta from './assets/image copy.png'
import imgKurtaProduct from './assets/image copy copy.png'
const imgSneakers = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080'

// ---- Reel background photos ----
const BG_KURTA = imgKurta
const BG_SNEAKERS = imgSneakers
const BG_DUPATTA = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1080'
const BG_WATCH = 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1080'
const BG_SERUM = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1080'
const BG_MOISTURIZER = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1080'

export const CREATORS: Creator[] = [
  {
    id: 'ananya',
    username: 'ananya.styles',
    displayName: 'Ananya Iyer',
    avatar: 'https://i.pravatar.cc/200?img=47',
    banner: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e6b?auto=format&fit=crop&w=900&q=70',
    themeColor: '#C4021A',
    themeGradient: 'linear-gradient(135deg, #6F010E 0%, #C4021A 55%, #8E0112 100%)',
    followers: 1240000,
    verified: true,
    bio: 'Ethnic fashion creator ✦ Jaipur\nHand-crafted looks, daily drops 🛍️',
  },
  {
    id: 'rohan',
    username: 'rohan.kicks',
    displayName: 'Rohan Verma',
    avatar: 'https://i.pravatar.cc/200?img=12',
    banner: 'https://images.unsplash.com/photo-1556906781-9a58a4c4f3c7?auto=format&fit=crop&w=900&q=70',
    themeColor: '#1D4ED8',
    themeGradient: 'linear-gradient(135deg, #0B2F6B 0%, #1D4ED8 55%, #1450A3 100%)',
    followers: 847000,
    verified: true,
    bio: 'Streetwear & kicks ✦ Mumbai\nDrop the fits, daily 🔥',
  },
  {
    id: 'priya',
    username: 'priya.glow',
    displayName: 'Priya Nair',
    avatar: 'https://i.pravatar.cc/200?img=32',
    banner: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=70',
    themeColor: '#EC4899',
    themeGradient: 'linear-gradient(135deg, #831843 0%, #EC4899 55%, #BE185D 100%)',
    followers: 567000,
    verified: true,
    bio: 'Skincare & glow ✦ Bengaluru\nGlow secrets revealed 🌟',
  },
]

export const STOREFRONT: Record<string, Product[]> = {
  ananya: [
    { id: 'p_kurta', name: 'Hand-Block Cotton Kurta', seller: 'ananya.styles', price: 1499, image: IMG_KURTA },
    { id: 'p_dupatta', name: 'Embroidered Saree', seller: 'ananya.styles', price: 1799, image: IMG_DUPATTA },
    { id: 'p_juttis', name: 'Handcrafted Juttis', seller: 'ananya.styles', price: 1099, image: IMG_JUTTIS },
    { id: 'p_earrings', name: 'Oxidised Earrings', seller: 'ananya.styles', price: 649, image: IMG_EARRINGS },
  ],
  rohan: [
    { id: 'p_sneakers', name: 'Sneakers', seller: 'rohan.kicks', price: 2499, image: IMG_SNEAKERS },
    { id: 'p_backpack', name: 'Backpack', seller: 'rohan.kicks', price: 1899, image: IMG_BACKPACK },
    { id: 'p_watch', name: 'Watch', seller: 'rohan.kicks', price: 3299, image: IMG_WATCH },
    { id: 'p_cap', name: 'Cap', seller: 'rohan.kicks', price: 549, image: IMG_CAP },
  ],
  priya: [
    { id: 'p_serum', name: 'Vitamin C Glow Serum', seller: 'priya.glow', price: 899, image: IMG_SERUM },
    { id: 'p_moisturizer', name: 'Moisturizer', seller: 'priya.glow', price: 649, image: IMG_MOISTURIZER },
    { id: 'p_facewash', name: 'Face Wash', seller: 'priya.glow', price: 349, image: IMG_FACEWASH },
    { id: 'p_lipstick', name: 'Lipstick', seller: 'priya.glow', price: 599, image: IMG_LIPSTICK },
  ],
}

const seedComments = (list: [string, string][]): Comment[] =>
  list.map(([user, text], i) => ({
    id: `seed_${i}_${user}`,
    user,
    avatar: `https://i.pravatar.cc/100?u=${user}_${i}`,
    text,
  }))

export const REELS: Reel[] = [
  {
    id: 'r1',
    creatorId: 'ananya',
    caption: 'Hand-Block Cotton Kurta — breathable, hand-printed, ready to ship ✨ Tap to shop 🛍️',
    likes: '24.8K',
    shares: '1.2K',
    product: STOREFRONT.ananya[0],
    bg: BG_KURTA,
    comments: seedComments([
      ['neha.styles', 'Obsessed with this kurta 😍'],
      ['kavya.r', 'What size is she wearing?'],
    ]),
  },
  {
    id: 'r2',
    creatorId: 'rohan',
    caption: 'Fresh on feet 🔥 clean white sneakers, shoppable below 👇',
    likes: '102K',
    shares: '6.2K',
    product: STOREFRONT.rohan[0],
    bg: BG_SNEAKERS,
    comments: seedComments([
      ['arjun.drip', 'Need these in my rotation 🔥'],
      ['ved.k', 'Restock when?'],
    ]),
  },
  {
    id: 'r3',
    creatorId: 'priya',
    caption: 'My everyday glow starts here 💧 Vitamin C that actually works.',
    likes: '58.2K',
    shares: '3.8K',
    product: STOREFRONT.priya[0],
    bg: BG_SERUM,
    comments: seedComments([
      ['diya.glow', 'This cleared my skin in a week 🙏'],
      ['meera.k', 'Worth the price?'],
    ]),
  },
  {
    id: 'r4',
    creatorId: 'ananya',
    caption: 'Embroidered Saree',
    likes: '18.1K',
    shares: '980',
    product: STOREFRONT.ananya[1],
    bg: BG_DUPATTA,
    comments: seedComments([
      ['ishita.r', 'The colour is stunning ✨'],
      ['tara.b', 'Pair it with what?'],
    ]),
  },
  {
    id: 'r5',
    creatorId: 'rohan',
    caption: 'The only watch you need ⌚ minimal, heavy, daily-wear.',
    likes: '31.2K',
    shares: '2.1K',
    product: STOREFRONT.rohan[2],
    bg: BG_WATCH,
    comments: seedComments([
      ['neil.v', 'Got mine yesterday — love it'],
      ['roy.m', 'Waterproof?'],
    ]),
  },
  {
    id: 'r6',
    creatorId: 'priya',
    caption: 'Hydration locked in 🌿 the moisturizer I keep repurchasing.',
    likes: '21.4K',
    shares: '1.4K',
    product: STOREFRONT.priya[1],
    bg: BG_MOISTURIZER,
    comments: seedComments([
      ['sara.h', 'Non-greasy and perfect 🙌'],
      ['kim.p', 'Good for oily skin?'],
    ]),
  },
]

export const formatINR = (n: number) =>
  '₹' + Math.round(n).toLocaleString('en-IN')

/** Compact follower formatting: 1240000 -> 1.24M, 847000 -> 847K */
export const formatCount = (n: number): string => {
  if (n >= 1_000_000) {
    const v = n / 1_000_000
    return (Number.isInteger(v) ? v.toString() : v.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')) + 'M'
  }
  if (n >= 1_000) {
    const v = n / 1_000
    return (Number.isInteger(v) ? v.toString() : v.toFixed(1).replace(/\.0$/, '')) + 'K'
  }
  return n.toString()
}
