import { BagIcon, HomeIcon, SearchIcon, WalletIcon } from './icons'

export type Tab = 'home' | 'search' | 'bag' | 'wallet'

type Props = {
  active: Tab
  onChange: (t: Tab) => void
  hidden?: boolean
  cartCount?: number
}

const ITEMS: { key: Tab; label: string; Icon: typeof HomeIcon }[] = [
  { key: 'home', label: 'Home', Icon: HomeIcon },
  { key: 'search', label: 'Search', Icon: SearchIcon },
  { key: 'bag', label: 'Bag', Icon: BagIcon },
  { key: 'wallet', label: 'Wallet', Icon: WalletIcon },
]

export default function BottomNav({ active, onChange, hidden, cartCount = 0 }: Props) {
  if (hidden) return null
  return (
    <nav style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: 62,
      background: 'rgba(8,8,10,0.92)', backdropFilter: 'blur(14px)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      zIndex: 30, paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {ITEMS.map(({ key, label, Icon }) => {
        const on = active === key
        return (
          <button key={key} onClick={() => onChange(key)} aria-label={label} style={{
            background: 'none', border: 'none', cursor: 'pointer', display: 'flex',
            flexDirection: 'column', alignItems: 'center', gap: 3,
            color: on ? 'var(--red-bright)' : 'rgba(255,255,255,0.55)',
            transition: 'color .2s ease, transform .15s ease', transform: on ? 'translateY(-1px)' : 'none',
            padding: '4px 12px', position: 'relative',
          }}>
            <Icon size={22} fill={key === 'bag'} />
            {key === 'bag' && cartCount > 0 && (
              <span style={{
                position: 'absolute', top: -2, right: 4, minWidth: 16, height: 16,
                background: 'var(--red-bright)', color: '#fff',
                borderRadius: 999, fontSize: 10, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 4px', border: '1.5px solid #0a0a0a',
              }}>{cartCount > 9 ? '9+' : cartCount}</span>
            )}
            <span style={{ fontSize: 10.5, fontWeight: 700 }}>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
