import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useShop } from '../context/ShopContext'

export default function SiteLayout() {
  const { toast } = useShop()
  const { pathname } = useLocation()

  // go to top when changing page
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {toast && <div className="toast"><i className="fa fa-check-circle"></i> {toast}</div>}
    </>
  )
}
