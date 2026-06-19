import { CREATORS, STOREFRONT, formatINR } from './data'
import type { Product } from './data'
import { ChevronLeftIcon, StarIcon, VerifiedIcon } from './icons'

type Props = {
  creatorId: string
  onBack: () => void
  onOpenProduct: (productId: string) => void
}

export default function CreatorStorefront({ creatorId, onBack, onOpenProduct }: Props) {
  const creator = CREATORS.find(c => c.id === creatorId)!
  const products = STOREFRONT[creatorId] ?? []

  return (
    <div className="screen slide-in" style={{ background: '#0a0a0a' }}>
      {/* Banner */}
      <div style={{ position: 'relative', height: 180, flexShrink: 0 }}>
        <img src={creator.banner} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.4), rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.95))' }} />
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
        <div style={{ position: 'absolute', top: 14, right: 14, padding: '6px 12px', borderRadius: 999, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', fontSize: 12, fontWeight: 700 }}>
          Shop
        </div>
      </div>

      {/* Profile head */}
      <div style={{ position: 'relative', marginTop: -42, padding: '0 18px', flexShrink: 0 }}>
        <img src={creator.avatar} alt={creator.displayName} style={{ width: 84, height: 84, borderRadius: 999, objectFit: 'cover', border: '3.5px solid #0a0a0a', boxShadow: '0 6px 18px rgba(0,0,0,0.5)' }} />
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <h1 style={{ fontSize: 19, fontWeight: 800 }}>{creator.displayName}</h1>
          <VerifiedIcon size={18} />
        </div>
        <div style={{ marginTop: 2, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>@{creator.username}</div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{creator.followers}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>Followers</div>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{products.length}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>Products</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: 'linear-gradient(135deg, var(--pink), var(--pink-deep))',
              color: 'var(--red)', fontSize: 11, fontWeight: 800, padding: '5px 10px', borderRadius: 999,
            }}>
              <StarIcon size={12} /> Verified seller
            </span>
          </div>
        </div>
        <p style={{ marginTop: 12, fontSize: 13.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
          {creator.bio}
        </p>
        <button className="btn btn-red" style={{ marginTop: 14, padding: '11px', fontSize: 14 }}>
          Follow @{creator.username}
        </button>
      </div>

      {/* Tabs placeholder */}
      <div style={{ marginTop: 18, padding: '0 18px', display: 'flex', gap: 22, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {['Shop', 'Reels', 'Liked'].map((t, i) => (
          <div key={t} style={{
            paddingBottom: 10, fontSize: 13.5, fontWeight: 700,
            color: i === 0 ? '#fff' : 'rgba(255,255,255,0.45)',
            borderBottom: i === 0 ? '2px solid var(--red-bright)' : '2px solid transparent',
          }}>{t}</div>
        ))}
      </div>

      {/* 2-col product grid */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 90px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {products.map((p) => (
            <StoreProduct key={p.id} product={p} onOpen={() => onOpenProduct(p.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StoreProduct({ product, onOpen }: { product: Product; onOpen: () => void }) {
  return (
    <button onClick={onOpen} style={{
      background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', aspectRatio: '1 / 1' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s ease' }}
          className="store-img" loading="lazy" />
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
      <div style={{ marginTop: 2, fontSize: 14, fontWeight: 800, color: 'var(--red-bright)' }}>{formatINR(product.price)}</div>
      <style>{`.store-img:hover{transform:scale(1.06)}`}</style>
    </button>
  )
}
