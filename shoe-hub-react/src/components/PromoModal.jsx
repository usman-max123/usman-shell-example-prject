import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Pops up 2 seconds after the home page opens (once per browser tab session)
export default function PromoModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('sh_promo_seen')) return
    const t = setTimeout(() => setOpen(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const close = () => { setOpen(false); sessionStorage.setItem('sh_promo_seen', '1') }

  return (
    <div className="modal" style={{ display: open ? 'flex' : 'none' }} onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={close}>&times;</span>
        <div className="modal-body">
          <span className="emoji">⚡</span>
          <h2>SUNDAY DROP</h2>
          <p>Get <b>25% OFF</b> on all 2026 limited editions. Use code: <b>RUNFAST</b></p>
          <Link to="/gallery" className="modal-btn" onClick={close}>SHOP THE DROP</Link>
        </div>
      </div>
    </div>
  )
}
