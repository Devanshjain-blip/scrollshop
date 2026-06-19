import { useEffect, useState } from 'react'
import { formatINR } from './data'
import { CheckIcon } from './icons'

type Props = {
  total: number
  onDone: () => void
}

export default function PaymentSuccess({ total, onDone }: Props) {
  const [phase, setPhase] = useState<'loading' | 'done'>('loading')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('done'), 1800)
    return () => clearTimeout(t1)
  }, [])

  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg,#1a0306 0%, #0a0a0a 60%)' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
        {phase === 'loading' ? (
          <>
            <div className="spinner" />
            <div style={{ marginTop: 22, fontWeight: 600, fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>
              Processing payment
            </div>
            <div style={{ marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              Charging your wallet…
            </div>
          </>
        ) : (
          <>
            <div className="success-pop" style={{
              width: 92, height: 92, borderRadius: '50%',
              background: 'linear-gradient(135deg,#22C55E,#16A34A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 0 6px rgba(34,197,94,0.18), 0 14px 40px rgba(34,197,94,0.35)',
            }}>
              <CheckIcon size={44} className="success-check" />
            </div>
            <h1 style={{ marginTop: 22, fontSize: 27, fontWeight: 800, letterSpacing: -0.01 }}>Order confirmed!</h1>
            <div style={{ marginTop: 8, fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>
              Your order is on its way
            </div>
            <div style={{
              marginTop: 16, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)',
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(254,222,225,0.08)', border: '1px solid rgba(254,222,225,0.18)',
              padding: '8px 14px', borderRadius: 999,
            }}>
              <span style={{ color: 'var(--pink-deep)' }}>Paid from wallet</span>
              <span style={{ color: '#fff', fontWeight: 800 }}>{formatINR(total)}</span>
            </div>
          </>
        )}
      </div>

      <div style={{ padding: '0 18px 36px' }}>
        <button className="btn btn-red" onClick={onDone} disabled={phase === 'loading'}>
          Back to feed
        </button>
      </div>

      <style>{`
        .spinner {
          width: 54px; height: 54px; border-radius: 50%;
          border: 4px solid rgba(255,255,255,0.12);
          border-top-color: var(--red-bright);
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .success-pop { animation: pop 0.5s cubic-bezier(0.22,1.5,0.4,1) both; }
        @keyframes pop {
          0% { transform: scale(0.3); opacity: 0; }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        .success-check { animation: draw 0.4s 0.25s ease both; }
        @keyframes draw { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }

        .btn:disabled { opacity: 0.5; }
      `}</style>
    </div>
  )
}
