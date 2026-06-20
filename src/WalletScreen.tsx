import { useState } from 'react'
import { formatINR } from './data'
import { ChevronLeftIcon, WalletIcon, CloseIcon } from './icons'

type Props = {
  balance: number
  onAdd: (amount: number) => void
  onWithdraw: (amount: number) => void
  onBack: () => void
}

const QUICK_ADD = [500, 1000, 2000, 5000]
const QUICK_WITHDRAW = [500, 1000, 2000]

type ConfirmState = { kind: 'add' | 'withdraw'; amount: number } | null

export default function WalletScreen({ balance, onAdd, onWithdraw, onBack }: Props) {
  const [addCustom, setAddCustom] = useState('')
  const [withdrawCustom, setWithdrawCustom] = useState('')
  const [confirm, setConfirm] = useState<ConfirmState>(null)
  const [flash, setFlash] = useState<{ msg: string; ok: boolean } | null>(null)

  const flashMsg = (msg: string, ok = true) => {
    setFlash({ msg, ok })
    setTimeout(() => setFlash(null), 2200)
  }

  // Any add (quick or custom) opens the confirm modal first
  const requestAdd = (raw: string | number) => {
    const n = typeof raw === 'number' ? raw : parseInt(String(raw).replace(/[^0-9]/g, ''), 10)
    if (!n || n <= 0) return
    setConfirm({ kind: 'add', amount: n })
    setAddCustom('')
  }

  const requestWithdraw = (raw: string | number) => {
    const n = typeof raw === 'number' ? raw : parseInt(String(raw).replace(/[^0-9]/g, ''), 10)
    if (!n || n <= 0) return
    if (n > balance) {
      flashMsg("You can't withdraw more than your balance.", false)
      setWithdrawCustom('')
      return
    }
    setConfirm({ kind: 'withdraw', amount: n })
    setWithdrawCustom('')
  }

  const confirmYes = () => {
    if (!confirm) return
    if (confirm.kind === 'add') {
      onAdd(confirm.amount)
      flashMsg(`✓ ${formatINR(confirm.amount)} added to your wallet`)
    } else {
      onWithdraw(confirm.amount)
      flashMsg(`✓ ${formatINR(confirm.amount)} withdrawn from your wallet`)
    }
    setConfirm(null)
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

      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '8px 18px 96px' }}>
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

        {/* Flash feedback */}
        {flash && (
          <div className="fade-in" style={{
            marginTop: 14, padding: '11px 14px', borderRadius: 14,
            background: flash.ok ? 'rgba(34,197,94,0.12)' : 'rgba(248,113,113,0.12)',
            border: `1px solid ${flash.ok ? 'rgba(34,197,94,0.32)' : 'rgba(248,113,113,0.34)'}`,
            color: flash.ok ? 'var(--green-bright)' : '#FCA5A5',
            fontSize: 14, fontWeight: 700,
          }}>
            {flash.msg}
          </div>
        )}

        {/* Add money */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>Add money</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {QUICK_ADD.map(amt => (
              <button key={amt} onClick={() => requestAdd(amt)} className="btn" style={{
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
              value={addCustom}
              onChange={e => setAddCustom(e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={e => e.key === 'Enter' && requestAdd(addCustom)}
              style={{
                flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
                color: '#fff', borderRadius: 12, padding: '13px 14px', fontSize: 15, fontFamily: 'inherit', outline: 'none',
              }}
            />
            <button className="btn btn-red" style={{ width: 'auto', padding: '0 22px', fontSize: 15 }} onClick={() => requestAdd(addCustom)}>
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
                  onClick={() => requestWithdraw(amt)}
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
              onKeyDown={e => e.key === 'Enter' && requestWithdraw(withdrawCustom)}
              disabled={balance <= 0}
              style={{
                flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
                color: '#fff', borderRadius: 12, padding: '13px 14px', fontSize: 15, fontFamily: 'inherit', outline: 'none', opacity: balance <= 0 ? 0.4 : 1,
              }}
            />
            <button
              className="btn"
              disabled={balance <= 0}
              onClick={() => requestWithdraw(withdrawCustom)}
              style={{
                width: 'auto', padding: '0 18px', fontSize: 14, borderRadius: 12,
                background: balance <= 0 ? 'rgba(255,255,255,0.08)' : 'var(--red-bright)',
                color: '#fff', cursor: balance <= 0 ? 'not-allowed' : 'pointer',
              }}
            >
              Withdraw
            </button>
          </div>
        </div>

        <div style={{ marginTop: 26, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          Demo wallet · No real money is used
        </div>
      </div>

      {/* Are you sure? confirmation modal */}
      {confirm && (
        <ConfirmModal
          kind={confirm.kind}
          amount={confirm.amount}
          onCancel={() => setConfirm(null)}
          onConfirm={confirmYes}
        />
      )}

      <style>{`
        .balance-card { animation: cardIn .5s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes cardIn { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  )
}

function ConfirmModal({
  kind, amount, onCancel, onConfirm,
}: {
  kind: 'add' | 'withdraw'
  amount: number
  onCancel: () => void
  onConfirm: () => void
}) {
  const verb = kind === 'add' ? 'add' : 'withdraw'
  return (
    <>
      <div className="sheet-backdrop" onClick={onCancel} />
      <div className="confirm-modal" role="dialog" aria-modal="true" style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        background: '#0E0E10', borderRadius: 22, padding: 22, width: '82%', maxWidth: 340,
        boxShadow: '0 20px 60px rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.1)', zIndex: 60,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>Are you sure?</div>
        <div style={{ marginTop: 10, fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
          You're about to {verb} <strong style={{ color: kind === 'add' ? 'var(--green-bright)' : 'var(--red-bright)' }}>{formatINR(amount)}</strong>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
          <button className="btn" onClick={onCancel} style={{
            flex: 1, padding: '12px', fontSize: 15, borderRadius: 12, fontWeight: 700,
            background: 'rgba(255,255,255,0.08)', color: '#fff',
          }}>
            Cancel
          </button>
          <button className="btn btn-red" onClick={onConfirm} style={{ flex: 1, fontSize: 15 }}>
            Yes, {verb}
          </button>
        </div>
      </div>
      <style>{`
        .confirm-modal { animation: modalIn .28s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes modalIn { from { opacity:0; transform: translate(-50%, -48%) scale(0.94); } to { opacity:1; transform: translate(-50%, -50%) scale(1); } }
      `}</style>
    </>
  )
}
