import { useEffect, useRef, useState } from 'react'
import { CREATORS, REELS, REEL_BG, formatINR } from './data'
import type { Reel } from './data'
import {
  CommentIcon, HeartIcon, ShareIcon, VerifiedIcon,
  WalletIcon,
} from './icons'

type Props = {
  onOpenProduct: (reelIndex: number) => void
  onOpenCreator: (creatorId: string) => void
  onOpenWallet: () => void
  walletBalance: number
}

export default function ReelsFeed({ onOpenProduct, onOpenCreator, onOpenWallet, walletBalance }: Props) {
  const feedRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  useEffect(() => {
    const el = feedRef.current
    if (!el) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const idx = Math.round(el.scrollTop / el.clientHeight)
        if (idx !== activeRef.current) {
          activeRef.current = idx
          setActive(idx)
        }
        ticking = false
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="screen">
      <div
        ref={feedRef}
        className="no-scrollbar"
        style={{
          flex: 1, overflowY: 'scroll', scrollSnapType: 'y mandatory',
          position: 'relative', background: '#000',
        }}
      >
        {REELS.map((reel, i) => {
          const creator = CREATORS.find(c => c.id === reel.creatorId)!
          return (
            <ReelCard
              key={reel.id}
              reel={reel}
              creator={creator.username}
              creatorAvatar={creator.avatar}
              active={i === active}
              onOpenProduct={() => onOpenProduct(i)}
              onOpenCreator={() => onOpenCreator(creator.id)}
              walletBalance={walletBalance}
              onOpenWallet={onOpenWallet}
            />
          )
        })}
      </div>
    </div>
  )
}

type CardProps = {
  reel: Reel
  creator: string
  creatorAvatar: string
  active: boolean
  onOpenProduct: () => void
  onOpenCreator: () => void
  walletBalance: number
  onOpenWallet: () => void
}

function ReelCard({ reel, creator, creatorAvatar, active, onOpenProduct, onOpenCreator, walletBalance, onOpenWallet }: CardProps) {
  const [liked, setLiked] = useState(false)
  return (
    <div style={{
      position: 'relative', height: '100%', width: '100%',
      scrollSnapAlign: 'start', overflow: 'hidden',
    }}>
      <img
        src={REEL_BG[reel.id]}
        alt=""
        className={active ? 'reel-bg-active' : ''}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover',
        }}
        loading="lazy"
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.6) 78%, rgba(0,0,0,0.92) 100%)',
      }} />

      {/* Top status bar + app header with wallet pill */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '14px 16px 8px', zIndex: 7 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 19 }}>
            <span style={{ color: '#fff' }}>Scroll</span>
            <span style={{ color: 'var(--red-bright)' }}>Shop</span>
          </div>
          <button onClick={onOpenWallet} aria-label="Open wallet" className="wallet-pill" style={{
            display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(254,222,225,0.3)', borderRadius: 999,
            padding: '5px 11px 5px 8px', color: '#fff',
          }}>
            <WalletIcon size={15} />
            <span style={{ fontSize: 13, fontWeight: 800 }}>{formatINR(walletBalance)}</span>
          </button>
        </div>
      </div>

      {/* Right action rail */}
      <div style={{
        position: 'absolute', right: 12, bottom: 230, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 18, zIndex: 5,
      }}>
        <ActionBtn onClick={() => setLiked(v => !v)}>
          <HeartIcon size={30} fill={liked} className={liked ? 'liked' : ''} />
          <Count>{liked ? bump(reel.likes) : reel.likes}</Count>
        </ActionBtn>
        <ActionBtn>
          <CommentIcon size={29} />
          <Count>{reel.comments}</Count>
        </ActionBtn>
        <ActionBtn>
          <ShareIcon size={28} />
          <Count>{reel.shares}</Count>
        </ActionBtn>
        <img src={creatorAvatar} alt="" style={{ width: 38, height: 38, borderRadius: 8, objectFit: 'cover', border: '1.5px solid #fff', marginTop: 4 }} />
      </div>

      {/* Creator + caption */}
      <div style={{ position: 'absolute', left: 16, right: 76, bottom: 230, zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={creatorAvatar} alt={creator} style={{ width: 36, height: 36, borderRadius: 999, objectFit: 'cover', border: '2px solid #fff' }} />
          <button onClick={onOpenCreator} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>@{creator}</span>
            <VerifiedIcon size={15} />
          </button>
          <FollowButton />
        </div>
        <div style={{ marginTop: 8, fontSize: 13.5, color: 'rgba(255,255,255,0.92)', lineHeight: 1.4 }}>
          {reel.caption}
        </div>
      </div>

      {/* Shop tag card */}
      <button
        onClick={onOpenProduct}
        className="shop-tag"
        style={{
          position: 'absolute', left: 14, right: 14, bottom: 92, zIndex: 6,
          background: '#fff', borderRadius: 18, padding: 10, display: 'flex',
          alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left',
          border: 'none', width: 'calc(100% - 28px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
        }}
      >
        <img src={reel.product.image} alt={reel.product.name} style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: '#0a0a0a', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {reel.product.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 3,
              background: 'var(--pink)', color: 'var(--red)', fontSize: 10.5, fontWeight: 800,
              padding: '2px 7px', borderRadius: 999,
            }}>
              <VerifiedIcon size={11} /> Creator-verified
            </span>
            <span style={{ fontSize: 9.5, color: '#888', fontWeight: 600 }}>· {reel.product.seller}</span>
          </div>
          <div style={{ marginTop: 4, fontWeight: 800, fontSize: 15, color: '#0a0a0a' }}>{formatINR(reel.product.price)}</div>
        </div>
        <div className="btn btn-red" style={{ width: 'auto', padding: '10px 16px', fontSize: 14, borderRadius: 12 }}>
          Buy now
        </div>
      </button>

      <style>{`
        .shop-tag { transition: transform .18s ease, box-shadow .18s ease; }
        .shop-tag:active { transform: scale(0.97); }
        .liked { color: var(--red-bright) !important; animation: popHeart .35s ease; }
        @keyframes popHeart { 0%{transform:scale(1)} 40%{transform:scale(1.3)} 100%{transform:scale(1)} }
        .reel-bg-active { animation: kenburns 8s ease-out forwards; }
        @keyframes kenburns { from{transform:scale(1)} to{transform:scale(1.08)} }
      `}</style>
    </div>
  )
}

function FollowButton() {
  const [following, setFollowing] = useState(false)
  return (
    <button
      className={`btn btn-pink ${following ? 'following' : ''}`}
      onClick={() => setFollowing(v => !v)}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  )
}

function ActionBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', color: '#fff', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 0,
    }}>
      {children}
    </button>
  )
}
function Count({ children }: { children: React.ReactNode }) {
  return <span style={{ fontSize: 12, fontWeight: 600, fontFamily: 'sans-serif' }}>{children}</span>
}
function bump(s: string) {
  // crude +1 on a display string like "24.8K"
  const m = s.match(/^([\d.]+)([KM]?)$/)
  if (!m) return s
  const n = parseFloat(m[1]) + 0.1
  return n.toFixed(1).replace(/\.0$/, '') + (m[2] || '')
}
