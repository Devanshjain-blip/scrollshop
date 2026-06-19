import { useEffect, useState } from 'react'
import type { Product } from './data'
import { formatINR } from './data'
import { BagIcon, CloseIcon, MinusIcon, PlusIcon, VerifiedIcon, WalletIcon } from './icons'

type Props = {
  product: Product
  creatorName: string
  walletBalance: number
  onClose: () => void
  onPay: (qty: number) => void
  onOpenWallet: () => void
  onAddToCart: (qty: number) => void
}

export default function CheckoutSheet({ product, creatorName, walletBalance, onClose, onPay, onOpenWallet, onAddToCart }: Props) {
  const [qty, setQty] = useState(1)
  const [closing, setClosing] = useState(false)
  const total = product.price * qty
  const sufficient = walletBalance >= total
  const shortfall = Math.max(0, total - walletBalance)

  const handleClose = () => {
    if (closing) return
    setClosing(true)
    setTimeout(onClose, 280)
  }

  const handleAddMoney = () => {
    if (closing) return
    setClosing(true)
    setTimeout(() => { onClose(); onOpenWallet() }, 280)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={`sheet-backdrop ${closing ? 'closing' : ''}`} onClick={handleClose} />
      <div className={`sheet ${closing ? 'closing' : ''}`} role="dialog" aria-modal="true">
        <div className="sheet-handle" />
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.08)',
            border: 'none', color: '#fff', width: 30, height: 30, borderRadius: 999,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <CloseIcon size={16} />
        </button>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <img src={product.image} alt={product.name}
            style={{ width: 72, height: 72, borderRadius: 14, objectFit: 'cover' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.2 }}>{product.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4, color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
              <span>{product.seller}</span>
              <span style={{ color: '#1D9BF0' }}><VerifiedIcon size={13} /></span>
              <span style={{ color: 'var(--pink-deep)' }}>via @{creatorName}</span>
            </div>
            <div style={{ marginTop: 6, fontWeight: 800, fontSize: 18, color: 'var(--red-bright)' }}>
              {formatINR(product.price)}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Quantity</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '6px 10px' }}>
            <button aria-label="decrease"
              onClick={() => setQty(q => Math.max(1, q - 1))}
              style={{ border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex' }}>
              <MinusIcon size={16} />
            </button>
            <span style={{ minWidth: 20, textAlign: 'center', fontWeight: 700 }}>{qty}</span>
            <button aria-label="increase"
              onClick={() => setQty(q => Math.min(9, q + 1))}
              style={{ border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex' }}>
              <PlusIcon size={16} />
            </button>
          </div>
        </div>

        {/* Wallet row */}
        <div style={{
          marginTop: 14, padding: '12px 14px', borderRadius: 12,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ color: 'var(--pink-deep)', display: 'flex' }}><WalletIcon size={18} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#fff' }}>ScrollShop Wallet</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              Balance <span style={{ fontWeight: 700, color: sufficient ? 'var(--green-bright)' : '#F87171' }}>{formatINR(walletBalance)}</span>
            </div>
          </div>
          <span style={{
            fontSize: 10.5, fontWeight: 800, letterSpacing: 0.02,
            color: sufficient ? 'var(--green-bright)' : 'var(--red-bright)',
            background: sufficient ? 'rgba(34,197,94,0.14)' : 'rgba(248,113,113,0.14)',
            padding: '4px 9px', borderRadius: 999,
          }}>
            {sufficient ? 'Paying via wallet' : 'Low balance'}
          </span>
        </div>

        <div style={{ marginTop: 12, padding: '12px 14px', background: 'rgba(254,222,225,0.05)', borderRadius: 12, border: '1px solid rgba(254,222,225,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 16 }}>
            <span>Total</span><span>{formatINR(total)}</span>
          </div>
        </div>

        {/* Insufficient balance notice */}
        {!sufficient && (
          <div className="fade-in" style={{
            marginTop: 12, padding: '12px 14px', borderRadius: 12,
            background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
            color: '#FCA5A5', fontSize: 13.5, lineHeight: 1.4,
          }}>
            Insufficient wallet balance — you need <strong>{formatINR(shortfall)}</strong> more. Add money to your wallet to continue.
            <button className="btn" onClick={handleAddMoney} style={{
              marginTop: 10, background: 'var(--pink)', color: 'var(--red)',
              borderRadius: 10, padding: '9px 14px', fontSize: 13.5, fontWeight: 800,
            }}>
              + Add money to wallet
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center', margin: '14px 0 6px', fontSize: 12.5, color: 'var(--pink-deep)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <BagIcon size={14} /> You never leave the feed.
        </div>

        <button
          className="btn"
          onClick={() => onAddToCart(qty)}
          style={{
            width: '100%', marginBottom: 10, padding: '13px 16px', fontSize: 15,
            borderRadius: 14, background: 'rgba(254,222,225,0.08)',
            border: '1.5px solid var(--pink)', color: '#fff', fontWeight: 700, cursor: 'pointer',
          }}
        >
          Add to cart
        </button>

        <button className="btn btn-red" disabled={!sufficient} onClick={() => onPay(qty)}>
          Pay {formatINR(total)} from wallet
        </button>
      </div>

      <style>{`.btn:disabled{opacity:0.5;}`}</style>
    </>
  )
}
