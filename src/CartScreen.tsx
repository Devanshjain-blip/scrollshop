import { useState } from 'react'
import type { CartItem } from './data'
import { formatINR } from './data'
import { ChevronLeftIcon, CloseIcon, MinusIcon, PlusIcon, WalletIcon, CheckIcon } from './icons'

type Props = {
  items: CartItem[]
  walletBalance: number
  onBack: () => void
  onUpdateQty: (id: string, qty: number) => void
  onRemove: (id: string) => void
  onPay: () => void
  onOpenWallet: () => void
}

type PayState =
  | { kind: 'idle' }
  | { kind: 'insufficient'; shortfall: number }
  | { kind: 'loading' }
  | { kind: 'success' }

export default function CartScreen({ items, walletBalance, onBack, onUpdateQty, onRemove, onPay, onOpenWallet }: Props) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const [pay, setPay] = useState<PayState>({ kind: 'idle' })

  const handlePay = () => {
    if (walletBalance < total) {
      setPay({ kind: 'insufficient', shortfall: total - walletBalance })
      return
    }
    setPay({ kind: 'loading' })
    setTimeout(() => setPay({ kind: 'success' }), 1800)
  }

  if (pay.kind === 'success') {
    return (
      <div className="screen" style={{ background: 'linear-gradient(180deg,#1a0306 0%, #0a0a0a 60%)' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
          <div className="success-pop" style={{
            width: 92, height: 92, borderRadius: '50%',
            background: 'linear-gradient(135deg,#22C55E,#16A34A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 6px rgba(34,197,94,0.18), 0 14px 40px rgba(34,197,94,0.35)',
          }}>
            <CheckIcon size={44} className="success-check" />
          </div>
          <h1 style={{ marginTop: 22, fontSize: 27, fontWeight: 800, letterSpacing: -0.01 }}>Order confirmed!</h1>
          <div style={{ marginTop: 8, fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>Your order is on its way</div>
          <div style={{
            marginTop: 16, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)',
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(254,222,225,0.08)', border: '1px solid rgba(254,222,225,0.18)',
            padding: '8px 14px', borderRadius: 999,
          }}>
            <span style={{ color: 'var(--pink-deep)' }}>Paid from wallet</span>
            <span style={{ color: '#fff', fontWeight: 800 }}>{formatINR(total)}</span>
          </div>
        </div>
        <div style={{ padding: '0 18px 36px' }}>
          <button className="btn btn-red" onClick={() => { onPay(); onBack() }}>Back to feed</button>
        </div>
        <style>{`
          .success-pop { animation: pop .5s cubic-bezier(0.22,1.5,0.4,1) both; }
          @keyframes pop { 0% { transform: scale(0.3); opacity: 0; } 60% { transform: scale(1.08); } 100% { transform: scale(1); opacity: 1; } }
          .success-check { animation: draw .4s 0.25s ease both; }
          @keyframes draw { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
        `}</style>
      </div>
    )
  }

  if (pay.kind === 'loading') {
    return (
      <div className="screen" style={{ background: '#0a0a0a' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
          <div className="spinner" />
          <div style={{ marginTop: 22, fontWeight: 600, fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>Processing payment</div>
          <div style={{ marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Charging your wallet…</div>
          <style>{`.spinner{width:54px;height:54px;border-radius:50%;border:4px solid rgba(255,255,255,0.12);border-top-color:var(--red-bright);animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    )
  }

  return (
    <div className="screen slide-in" style={{ background: '#0a0a0a', paddingBottom: 96 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 16px 8px' }}>
        <button onClick={onBack} aria-label="Back" style={{
          background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', cursor: 'pointer',
          width: 36, height: 36, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ChevronLeftIcon size={22} />
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 800 }}>Your Bag ({items.length})</h1>
      </div>

      {items.length === 0 ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 60 }}>🛍️</div>
          <h2 style={{ marginTop: 14, fontSize: 20, fontWeight: 800 }}>Your bag is empty</h2>
          <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.55)', fontSize: 14, maxWidth: 280, lineHeight: 1.5 }}>
            Shop the feed — tap any shop tag to add items to your bag.
          </p>
          <button className="btn btn-red" style={{ marginTop: 22, width: 200 }} onClick={onBack}>Back to Reels</button>
        </div>
      ) : (
        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 16px' }}>
          {items.map(item => (
            <div key={item.id} style={{
              display: 'flex', gap: 12, padding: '12px 0',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <img src={item.image} alt={item.name} style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.25 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{item.seller}</div>
                <div style={{ marginTop: 4, fontWeight: 800, fontSize: 15, color: 'var(--red-bright)' }}>{formatINR(item.price)}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '4px 8px' }}>
                    <button aria-label="decrease" onClick={() => onUpdateQty(item.id, item.qty - 1)} style={{ border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex' }}>
                      <MinusIcon size={15} />
                    </button>
                    <span style={{ minWidth: 18, textAlign: 'center', fontWeight: 700, fontSize: 14 }}>{item.qty}</span>
                    <button aria-label="increase" onClick={() => onUpdateQty(item.id, item.qty + 1)} style={{ border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex' }}>
                      <PlusIcon size={15} />
                    </button>
                  </div>
                  <button aria-label="remove" onClick={() => onRemove(item.id)} style={{
                    border: 'none', background: 'rgba(248,113,113,0.12)', color: '#F87171',
                    borderRadius: 8, width: 32, height: 32, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sticky pay bar */}
      {items.length > 0 && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 62,
          background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(14px)',
          borderTop: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 12, flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Total</span>
            <span style={{ fontSize: 20, fontWeight: 800 }}>{formatINR(total)}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.55)', width: '100%' }}>
            <span style={{ color: 'var(--pink-deep)', display: 'flex' }}><WalletIcon size={14} /></span>
            Wallet balance <span style={{ fontWeight: 700, color: walletBalance >= total ? 'var(--green-bright)' : '#F87171' }}>{formatINR(walletBalance)}</span>
          </div>

          {pay.kind === 'insufficient' && (
            <div className="fade-in" style={{
              width: '100%', padding: '10px 12px', borderRadius: 10,
              background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
              color: '#FCA5A5', fontSize: 13, lineHeight: 1.4,
            }}>
              Insufficient wallet balance — you need <strong>{formatINR(pay.shortfall)}</strong> more. Add money to your wallet to continue.
              <button className="btn" onClick={onOpenWallet} style={{
                marginTop: 8, background: 'var(--pink)', color: 'var(--red)',
                borderRadius: 8, padding: '8px 12px', fontSize: 12.5, fontWeight: 800,
              }}>+ Add money to wallet</button>
            </div>
          )}

          <button className="btn btn-red" style={{ width: '100%' }} onClick={handlePay}>
            Pay {formatINR(total)} from wallet
          </button>
        </div>
      )}
    </div>
  )
}

function TrashIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  )
}
