import { useEffect, useState } from 'react'

type Props = {
  onDone: () => void
}

const LOGO_DELAY = 150
const TAGLINE_DELAY = LOGO_DELAY + 650
const HOLD = TAGLINE_DELAY + 700

export default function Splash({ onDone }: Props) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), HOLD)
    const doneTimer = setTimeout(onDone, HOLD + 520)
    return () => { clearTimeout(leaveTimer); clearTimeout(doneTimer) }
  }, [onDone])

  return (
    <div className={`splash ${leaving ? 'splash-out' : ''}`}>
      <div className="splash-resolve">
        <h1 className="splash-logo">
          <span>Scroll</span><span className="splash-logo-accent">Shop</span>
        </h1>
        <p className="splash-tagline">Don't just scroll. Shop what you trust.</p>
      </div>

      <style>{`
        .splash {
          position: absolute; inset: 0; z-index: 100;
          background: #6F010E;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .splash-out { animation: splashFadeOut 0.5s ease forwards; }
        @keyframes splashFadeOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-12px); }
        }

        .splash-resolve {
          position: relative; z-index: 2;
          text-align: center;
          padding: 0 24px;
        }
        .splash-logo {
          font-family: 'Anton', sans-serif;
          font-size: clamp(56px, 17vw, 92px);
          letter-spacing: 0.02em;
          line-height: 1;
          margin: 0;
          color: #fff;
          opacity: 0;
          transform: scale(0.92) translateY(10px);
          animation: logoIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${LOGO_DELAY}ms forwards;
        }
        .splash-logo-accent { color: #FEDEE1; }
        @keyframes logoIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .splash-tagline {
          margin: 18px 0 0;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: rgba(255,255,255,0.82);
          opacity: 0;
          transform: translateY(8px);
          animation: taglineIn 0.55s ease ${TAGLINE_DELAY}ms forwards;
        }
        @keyframes taglineIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
