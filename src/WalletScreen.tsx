import { useState } from 'react'
import { formatINR } from './data'
import { ChevronLeftIcon, WalletIcon } from './icons'

type Props = {
  balance: number
  onAdd: (amount: number) => void
  onWithdraw: (amount: number) => void
  onBack: () => void
}

const QUICK = [500, 1000, 2000, 5000]
const QUICK_WITHDRAW = [500, 1000, 2000]

export default function WalletScreen({ balance, onAdd, onWithdraw, onBack }: Props) {
  const [custom, setCustom] = useState('')
  const [added, setAdded] = useState<number | null>(null)
  const [withdrawCustom, setWithdrawCustom] = useState('')
  const [withdrawn, setWithdrawn] = useState<number | null>(null)
  const [withdrawError, setWithdrawError] = useState<string | null>(null)

  const handleAdd = (amt: number) => {
    if (!amt || amt <= 0) return
    onAdd(amt)
    setAdded(amt)
    setTimeout(() => setAdded(null), 2200)
  }

  const handleCustom = () => {
    const n = parseInt(custom.replace(/[^0-9]/g, ''), 10)
    if (!n || n <= 0) return
    handleAdd(n)
    setCustom('')
  }

  const handleWithdraw = (amt: number) => {
    if (!amt || amt <= 0) return
    if (amt > balance) {
      setWithdrawError("You can't withdraw more than your balance.")
      setWithdrawn(null)
      setTimeout(() => setWithdrawError(null), 2600)
      return
    }
    onWithdraw(amt)
    setWithdrawn(amt)
    setWithdrawError(null)
    setTimeout(() => setWithdrawn(null), 2200)
  }

  const handleWithdrawCustom = () => {
    const n = parseInt(withdrawCustom.replace(/[^0-9]/g, ''), 10)
    if (!n || n <= 0) return
    handleWithdraw(n)
    setWithdrawCustom('')
  }

  return (
    <div className="screen slide-in" style={{ background: '#0a0a0a' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 16px 8px', flexShrink: 0 }}>
        <button onClick={onBack} aria-label="Back" style={{
          background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', cursor: 'pointer',
          width: 36, height: 36, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ChevronLeftIcon size={22} />
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 800 }}>ScrollShop Wallet</h1>
      </div>

      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '8px 18px 36px' }}>
        {/* Balance card */}
        <div className="balance-card" style={{
          borderRadius: 22, padding: 22, marginTop: 8, position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, #6F010E 0%, #C4021A 55%, #8E0112 100%)',
          boxShadow: '0 16px 40px rgba(111,1,14,0.4)',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.18, background: 'radial-gradient(70% 60% at 80% 0%, #fff, transparent 60%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600 }}>
              <WalletIcon size={16} /> Available balance
            </div>
            <div style={{ marginTop: 8, fontSize: 38, fontWeight: 800, letterSpacing: -0.02 }}>{formatINR(balance)}</div>
            <div style={{ marginTop: 4, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>ScrollShop Demo Wallet</div>
          </div>
        </div>

        {/* Empty note */}
        {balance === 0 && (
          <div style={{
            marginTop: 14, padding: '12px 14px', borderRadius: 14,
            background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.28)',
            color: '#FDE68A', fontSize: 13.5, lineHeight: 1.4,
          }}>
            Your wallet is empty. Add money below to start shopping.
          </div>
        )}

        {/* Added confirmation */}
        {added !== null && (
          <div className="fade-in" style={{
            marginTop: 14, padding: '11px 14px', borderRadius: 14,
            background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.32)',
            color: 'var(--green-bright)', fontSize: 14, fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            ✓ {formatINR(added)} added to your wallet
          </div>
        )}

        {/* Add money */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>Add money</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {QUICK.map(amt => (
              <button key={amt} onClick={() => handleAdd(amt)} className="btn" style={{
                background: 'rgba(254,222,225,0.08)', border: '1px solid rgba(254,222,225,0.22)',
                color: '#fff', borderRadius: 12, padding: '13px', fontSize: 15, fontWeight: 700,
              }}>
                + {formatINR(amt)}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <input
              inputMode="numeric"
              placeholder="Enter custom amount"
              value={custom}
              onChange={e => setCustom(e.target.value.replace(/[^0-9]/g, ''))}
              style={{
                flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
                color: '#fff', borderRadius: 12, padding: '13px 14px', fontSize: 15, fontFamily: 'inherit',
                outline: 'none',
              }}
            />
            <button className="btn btn-red" style={{ width: 'auto', padding: '0 22px', fontSize: 15 }} onClick={handleCustom}>
              Add
            </button>
          </div>
        </div>

        {/* Withdraw money */}
        <div style={{ marginTop: 26 }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12, color: 'rgba(255,255,255,0.85)' }}>Withdraw money</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {QUICK_WITHDRAW.map(amt => {
              const disabled = balance <= 0
              return (
                <button
                  key={amt}
                  onClick={() => handleWithdraw(amt)}
                  disabled={disabled}
                  className="btn"
                  style={{
                    background: disabled ? 'rgba(255,255,255,0.04)' : 'rgba(248,113,113,0.1)',
                    border: '1px solid ' + (disabled ? 'rgba(255,255,255,0.08)' : 'rgba(248,113,113,0.28)'),
                    color: disabled ? 'rgba(255,255,255,0.3)' : '#FCA5A5',
                    borderRadius: 12, padding: '12px 4px', fontSize: 14, fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer',
                  }}
                >
                  − {formatINR(amt)}
                </button>
              )
            })}
          </div>

          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <input
              inputMode="numeric"
              placeholder="Enter custom amount"
              value={withdrawCustom}
              onChange={e => setWithdrawCustom(e.target.value.replace(/[^0-9]/g, ''))}
              disabled={balance <= 0}
              style={{
                flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
                color: '#fff', borderRadius: 12, padding: '13px 14px', fontSize: 15, fontFamily: 'inherit',
                outline: 'none', opacity: balance <= 0 ? 0.4 : 1,
              }}
            />
            <button
              className="btn"
              disabled={balance <= 0}
              onClick={handleWithdrawCustom}
              style={{
                width: 'auto', padding: '0 18px', fontSize: 14, borderRadius: 12,
                background: balance <= 0 ? 'rgba(255,255,255,0.08)' : 'var(--red-bright)',
                color: '#fff', cursor: balance <= 0 ? 'not-allowed' : 'pointer',
              }}
            >
              Withdraw
            </button>
          </div>

          {withdrawn !== null && !withdrawError && (
            <div className="fade-in" style={{
              marginTop: 12, padding: '11px 14px', borderRadius: 14,
              background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.32)',
              color: 'var(--green-bright)', fontSize: 14, fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              ✓ {formatINR(withdrawn)} withdrawn from your wallet
            </div>
          )}
          {withdrawError && (
            <div className="fade-in" style={{
              marginTop: 12, padding: '11px 14px', borderRadius: 14,
              background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.34)',
              color: '#FCA5A5', fontSize: 14, fontWeight: 600,
            }}>
              {withdrawError}
            </div>
          )}
        </div>

        <div style={{ marginTop: 26, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          Demo wallet · No real money is used
        </div>
      </div>

      <style>{`
        .balance-card { animation: cardIn .5s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes cardIn { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  )
}
