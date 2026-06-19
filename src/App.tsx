import { useState } from 'react'
import ReelsFeed from './ReelsFeed'
import CheckoutSheet from './CheckoutSheet'
import PaymentSuccess from './PaymentSuccess'
import CreatorStorefront from './CreatorStorefront'
import WalletScreen from './WalletScreen'
import CartScreen from './CartScreen'
import BottomNav from './BottomNav'
import type { Tab } from './BottomNav'
import { CREATORS, REELS, STOREFRONT } from './data'
import type { CartItem, Product } from './data'

type Sheet = { product: Product; creatorName: string } | null
type Screen = 'feed' | 'store' | 'pay' | 'wallet' | 'cart' | 'placeholder'

export default function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [screen, setScreen] = useState<Screen>('feed')
  const [sheet, setSheet] = useState<Sheet>(null)
  const [payTotal, setPayTotal] = useState(0)
  const [storeCreatorId, setStoreCreatorId] = useState<string | null>(null)
  const [walletBalance, setWalletBalance] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])

  const openWallet = () => {
    setScreen('wallet')
    setTab('wallet')
  }

  const openCart = () => {
    setScreen('cart')
    setTab('bag')
  }

  const addMoney = (amount: number) => {
    setWalletBalance(b => b + amount)
  }

  const withdrawMoney = (amount: number) => {
    setWalletBalance(b => Math.max(0, b - amount))
  }

  const addToCart = (product: Product, qty: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { ...product, qty }]
    })
  }

  const updateCartQty = (id: string, qty: number) => {
    setCart(prev => qty <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const openReelProduct = (reelIndex: number) => {
    const reel = REELS[reelIndex]
    const creator = CREATORS.find(c => c.id === reel.creatorId)!
    setSheet({ product: reel.product, creatorName: creator.username })
  }

  const openStoreProduct = (creatorId: string, productId: string) => {
    const creator = CREATORS.find(c => c.id === creatorId)!
    const product = STOREFRONT[creatorId].find(p => p.id === productId) ?? REELS.find(r => r.creatorId === creatorId)!.product
    setSheet({ product, creatorName: creator.username })
  }

  const openCreator = (creatorId: string) => {
    setStoreCreatorId(creatorId)
    setScreen('store')
  }

  const handlePay = (qty: number) => {
    if (!sheet) return
    const total = sheet.product.price * qty
    setPayTotal(total)
    setWalletBalance(b => b - total)
    setSheet(null)
    setScreen('pay')
  }

  const handleAddToCart = (qty: number) => {
    if (!sheet) return
    addToCart(sheet.product, qty)
    setSheet(null)
    showToast('Added to cart ✓')
  }

  const handleCartPaid = () => {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
    setWalletBalance(b => b - total)
    setCart([])
    showToast('Order placed · Paid from wallet ✓')
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  const closeSheet = () => setSheet(null)

  const navToTab = (t: Tab) => {
    setTab(t)
    if (t === 'home') {
      setScreen('feed')
      setStoreCreatorId(null)
    } else if (t === 'wallet') {
      openWallet()
    } else if (t === 'bag') {
      openCart()
    } else {
      setScreen('placeholder')
    }
  }

  const renderPlaceholder = () => {
    const map = {
      search: { title: 'Search', sub: 'Discover creators & products across ScrollShop.', emoji: '🔎' },
      bag: { title: 'Shopping Bag', sub: 'Your bag is empty — shop from any reel to add items here.', emoji: '🛍️' },
      wallet: { title: 'Wallet', sub: '', emoji: '' },
    } as const
    const { title, sub, emoji } = map[tab as 'search' | 'bag' | 'wallet']
    return (
      <div className="screen fade-in" style={{ background: '#0a0a0a', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
        <div style={{ fontSize: 60 }}>{emoji}</div>
        <h2 style={{ marginTop: 14, fontSize: 22, fontWeight: 800 }}>{title}</h2>
        <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.55)', fontSize: 14, maxWidth: 280, lineHeight: 1.5 }}>{sub}</p>
        <button className="btn btn-red" style={{ marginTop: 22, width: 200 }} onClick={() => navToTab('home')}>
          Back to Reels
        </button>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <div className="phone">
        <div className="phone-inner">
          <div className="screen-stage">
            {screen === 'feed' && (
              <ReelsFeed
                onOpenProduct={openReelProduct}
                onOpenCreator={openCreator}
                onOpenWallet={openWallet}
                walletBalance={walletBalance}
              />
            )}
            {screen === 'store' && storeCreatorId && (
              <CreatorStorefront
                creatorId={storeCreatorId}
                onBack={() => { setScreen('feed'); setStoreCreatorId(null) }}
                onOpenProduct={(pid) => openStoreProduct(storeCreatorId, pid)}
              />
            )}
            {screen === 'pay' && (
              <PaymentSuccess
                total={payTotal}
                onDone={() => {
                  setScreen('feed')
                  setTab('home')
                  showToast('Order placed · Paid from wallet ✓')
                }}
              />
            )}
            {screen === 'wallet' && (
              <WalletScreen
                balance={walletBalance}
                onAdd={addMoney}
                onWithdraw={withdrawMoney}
                onBack={() => { setScreen('feed'); setTab('home') }}
              />
            )}
            {screen === 'cart' && (
              <CartScreen
                items={cart}
                walletBalance={walletBalance}
                onBack={() => { setScreen('feed'); setTab('home') }}
                onUpdateQty={updateCartQty}
                onRemove={removeFromCart}
                onPay={handleCartPaid}
                onOpenWallet={() => openWallet()}
              />
            )}
            {screen === 'placeholder' && renderPlaceholder()}
          </div>

          {sheet && (
            <CheckoutSheet
              product={sheet.product}
              creatorName={sheet.creatorName}
              walletBalance={walletBalance}
              onClose={closeSheet}
              onPay={handlePay}
              onOpenWallet={() => { setSheet(null); openWallet() }}
              onAddToCart={handleAddToCart}
            />
          )}

          <BottomNav active={tab} onChange={navToTab} hidden={screen === 'pay'} cartCount={cart.length} />

          {toast && (
            <div className="toast" style={{
              position: 'absolute', left: '50%', bottom: 84, transform: 'translateX(-50%)',
              background: 'rgba(34,197,94,0.16)', border: '1px solid rgba(34,197,94,0.4)',
              color: 'var(--green-bright)', backdropFilter: 'blur(10px)',
              padding: '10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700,
              zIndex: 50, whiteSpace: 'nowrap',
            }}>
              {toast}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .toast { animation: toastIn .3s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes toastIn { from { opacity: 0; transform: translate(-50%, 12px); } to { opacity: 1; transform: translate(-50%, 0); } }
      `}</style>
    </div>
  )
}
