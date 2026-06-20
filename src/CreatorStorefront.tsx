import { CREATORS, STOREFRONT, formatINR, formatCount } from './data'
import type { Product } from './data'
import { ChevronLeftIcon, StarIcon, VerifiedIcon } from './icons'
import ProductImage from './ProductImage'

type Props = {
  creatorId: string
  followed: boolean
  onToggleFollow: () => void
  onBack: () => void
  onOpenProduct: (productId: string) => void
}

export default function CreatorStorefront({ creatorId, followed, onToggleFollow, onBack, onOpenProduct }: Props) {
  const creator = CREATORS.find(c => c.id === creatorId)!
  const products = STOREFRONT[creatorId] ?? []
  const followers = creator.followers + (followed ? 1 : 0)
  const accent = creator.themeColor

  return (
    <div className="screen slide-in" style={{ background: '#0a0a0a', overflow: 'hidden' }}>
      {/* Single scrollable region: everything from banner to the last product scrolls together. */}
      <div className="no-scrollbar" style={{ height: '100%', overflowY: 'auto', paddingBottom: 96 }}>
      {/* Banner — themed gradient over a photo */}
      <div style={{ position: 'relative', height: 180 }}>
        <img src={creator.banner} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: creator.themeGradient, opacity: 0.55, mixBlendMode: 'multiply' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35), rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.96))' }} />
        <button
          onClick={onBack}
          aria-label="Back"
          style={{
            position: 'absolute', top: 14, left: 14, width: 38, height: 38,
            borderRadius: 999, background: 'rgba(0,0,0,0.45)', border: 'none', color: '#fff',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(6px)',
          }}
        >
          <ChevronLeftIcon size={22} />
        </button>
        <div style={{ position: 'absolute', top: 14, right: 14, padding: '6px 12px', borderRadius: 999, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5, color: accent }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: accent, display: 'inline-block' }} />
          Storefront
        </div>
      </div>

      {/* Profile head */}
      <div style={{ position: 'relative', marginTop: -42, padding: '0 18px' }}>
        <img src={creator.avatar} alt={creator.displayName} style={{ width: 84, height: 84, borderRadius: 999, objectFit: 'cover', border: '3.5px solid #0a0a0a', boxShadow: '0 6px 18px rgba(0,0,0,0.5)' }} />
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <h1 style={{ fontSize: 19, fontWeight: 800 }}>{creator.displayName}</h1>
          <VerifiedIcon size={18} />
        </div>
        <div style={{ marginTop: 2, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>@{creator.username}</div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{formatCount(followers)}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>Followers</div>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{products.length}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>Products</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: 'rgba(254,222,225,0.1)', border: `1px solid ${accent}55`,
              color: '#fff', fontSize: 11, fontWeight: 800, padding: '5px 10px', borderRadius: 999,
            }}>
              <StarIcon size={12} /> Verified seller
            </span>
          </div>
        </div>
        <p style={{ marginTop: 12, fontSize: 13.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
          {creator.bio}
        </p>

        {/* Prominent synced Follow button */}
        <button
          className={`btn btn-pink ${followed ? 'following' : ''}`}
          onClick={onToggleFollow}
          style={{
            marginTop: 14, padding: '12px 16px', fontSize: 15, borderRadius: 14, width: '100%',
            background: followed ? 'transparent' : accent,
            border: followed ? '1.5px solid rgba(255,255,255,0.4)' : 'none',
            color: '#fff',
          }}
        >
          {followed ? 'Following' : `Follow @${creator.username}`}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ marginTop: 18, padding: '0 18px', display: 'flex', gap: 22, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {['Shop', 'Reels', 'Liked'].map((t, i) => (
          <div key={t} style={{
            paddingBottom: 10, fontSize: 13.5, fontWeight: 700,
            color: i === 0 ? '#fff' : 'rgba(255,255,255,0.45)',
            borderBottom: i === 0 ? `2px solid ${accent}` : '2px solid transparent',
          }}>{t}</div>
        ))}
      </div>

      {/* 2-col product grid with lifestyle thumbnails + fallback */}
      <div className="no-scrollbar" style={{ padding: '14px 14px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {products.map((p) => (
            <StoreProduct key={p.id} product={p} accent={accent} onOpen={() => onOpenProduct(p.id)} />
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}

function StoreProduct({ product, accent, onOpen }: { product: Product; accent: string; onOpen: () => void }) {
  return (
    <button onClick={onOpen} style={{
      background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', aspectRatio: '1 / 1' }}>
        <ProductImage src={product.image} alt={product.name} className="store-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s ease' }} />
        <span style={{
          position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)', color: '#fff', fontSize: 10, fontWeight: 700,
          padding: '3px 7px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 3,
        }}>
          <VerifiedIcon size={11} /> Shoppable
        </span>
      </div>
      <div style={{ marginTop: 7, fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.25, height: 34, overflow: 'hidden' }}>
        {product.name}
      </div>
      <div style={{ marginTop: 2, fontSize: 14, fontWeight: 800, color: accent }}>{formatINR(product.price)}</div>
      <style>{`.store-img:hover{transform:scale(1.06)}`}</style>
    </button>
  )
}
