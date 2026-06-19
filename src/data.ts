export type Creator = {
  id: string
  username: string
  displayName: string
  avatar: string
  banner: string
  followers: string
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
  comments: string
  shares: string
  product: Product
}

// NOTE: each reel's background photo is the SAME as its product image,
// so the feed, the shop tag, and the checkout sheet all show one consistent photo.

// Hand-block cotton kurta — the kurta itself, worn / flat-laid.
const IMG_KURTA = 'https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=900&q=70'
const IMG_KURTA_CARD = 'https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=600&q=70'

// Sneakers — clean product shot of sneakers.
const IMG_SNEAKERS = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=70'
const IMG_SNEAKERS_CARD = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=70'

// Vitamin C serum — dropper skincare bottle.
const IMG_SERUM = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=70'
const IMG_SERUM_CARD = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=70'

// Silk dupatta — folded / draped textile.
const IMG_DUPATTA = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=70'

// Handcrafted juttis — traditional embroidered footwear.
const IMG_JUTTIS = 'https://images.unsplash.com/photo-1581618952207-9e8c6c8c8e7d?auto=format&fit=crop&w=600&q=70'

// Oxidised silver earrings — jewellery close-up.
const IMG_EARRINGS = 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=600&q=70'

export const CREATORS: Creator[] = [
  {
    id: 'c1',
    username: 'aanya.styles',
    displayName: 'Aanya Kapoor',
    avatar: 'https://i.pravatar.cc/150?img=47',
    banner: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=70',
    followers: '1.2M',
    verified: true,
    bio: 'Fashion creator ✦ Mumbai\nShoppable looks, daily drops 🛍️',
  },
  {
    id: 'c2',
    username: 'riya.beauty',
    displayName: 'Riya Mehta',
    avatar: 'https://i.pravatar.cc/150?img=32',
    banner: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=70',
    followers: '847K',
    verified: true,
    bio: 'Beauty & skincare ✦ Bengaluru\nVerified seller 💄',
  },
  {
    id: 'c3',
    username: 'kabir.wardrobe',
    displayName: 'Kabir Singh',
    avatar: 'https://i.pravatar.cc/150?img=12',
    banner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=70',
    followers: '2.4M',
    verified: true,
    bio: 'Menswear & streetwear ✦ Delhi\nDrop the fits 🔥',
  },
]

export const REELS: Reel[] = [
  {
    id: 'r1',
    creatorId: 'c1',
    caption: 'Hand-block cotton kurta — breathable, hand-printed, ready to ship ✨ Tap to shop 🛍️',
    likes: '24.8K',
    comments: '312',
    shares: '1.2K',
    product: {
      id: 'p_kurta',
      name: 'Hand-block Cotton Kurta',
      seller: 'Aanya Label',
      price: 1499,
      image: IMG_KURTA_CARD,
    },
  },
  {
    id: 'r2',
    creatorId: 'c2',
    caption: 'Brightening Vitamin C serum 💧 the one dropper I swear by — tagged below 👇',
    likes: '58.2K',
    comments: '904',
    shares: '3.8K',
    product: {
      id: 'p_serum',
      name: 'Vitamin C Brightening Serum',
      seller: 'Riya Beauty Co.',
      price: 899,
      image: IMG_SERUM_CARD,
    },
  },
  {
    id: 'r3',
    creatorId: 'c3',
    caption: 'Everyday white sneakers 🔥 lightweight & clean. Shoppable from the feed.',
    likes: '102K',
    comments: '1.4K',
    shares: '6.2K',
    product: {
      id: 'p_sneakers',
      name: 'Minimal White Sneakers',
      seller: 'Kabir Studio',
      price: 2499,
      image: IMG_SNEAKERS_CARD,
    },
  },
]

// Reel backgrounds mirror the product image so feed/tag/checkout are consistent.
export const REEL_BG: Record<string, string> = {
  r1: IMG_KURTA,
  r2: IMG_SERUM,
  r3: IMG_SNEAKERS,
}

// storefront products per creator
export const STOREFRONT: Record<string, Product[]> = {
  c1: [
    { id: 'p_kurta', name: 'Hand-block Cotton Kurta', seller: 'Aanya Label', price: 1499, image: IMG_KURTA_CARD },
    { id: 'p_dupatta', name: 'Banarasi Silk Dupatta', seller: 'Aanya Label', price: 1799, image: IMG_DUPATTA },
    { id: 'p_earrings', name: 'Oxidised Silver Earrings', seller: 'Aanya Label', price: 649, image: IMG_EARRINGS },
    { id: 'p_juttis', name: 'Handcrafted Juttis', seller: 'Aanya Label', price: 1099, image: IMG_JUTTIS },
  ],
  c2: [
    { id: 'p_serum', name: 'Vitamin C Brightening Serum', seller: 'Riya Beauty Co.', price: 899, image: IMG_SERUM_CARD },
    { id: 'p_kurta', name: 'Hand-block Cotton Kurta', seller: 'Riya Beauty Co.', price: 1499, image: IMG_KURTA_CARD },
    { id: 'p_earrings', name: 'Oxidised Silver Earrings', seller: 'Riya Beauty Co.', price: 649, image: IMG_EARRINGS },
    { id: 'p_dupatta', name: 'Banarasi Silk Dupatta', seller: 'Riya Beauty Co.', price: 1799, image: IMG_DUPATTA },
  ],
  c3: [
    { id: 'p_sneakers', name: 'Minimal White Sneakers', seller: 'Kabir Studio', price: 2499, image: IMG_SNEAKERS_CARD },
    { id: 'p_juttis', name: 'Handcrafted Juttis', seller: 'Kabir Studio', price: 1099, image: IMG_JUTTIS },
    { id: 'p_kurta', name: 'Hand-block Cotton Kurta', seller: 'Kabir Studio', price: 1499, image: IMG_KURTA_CARD },
    { id: 'p_dupatta', name: 'Banarasi Silk Dupatta', seller: 'Kabir Studio', price: 1799, image: IMG_DUPATTA },
  ],
}

export const formatINR = (n: number) =>
  '₹' + Math.round(n).toLocaleString('en-IN')
