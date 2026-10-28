import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'
import Slider from '../components/Slider'
import PromoModal from '../components/PromoModal'

export default function Home() {
  const { products } = useShop()
  const { hash } = useLocation()
  const newArrivals = products.filter((p) => p.category === 'New Arrivals')
  const collection  = products.filter((p) => p.category === 'Collection')

  // search results link to /#product-ID -> scroll to that card
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [hash])

  return (
    <div className="body">
      {/* Hero */}
      <div id="intro">
        <div className="intros" id="intros1">
          <div className="slogns123">
            <h1 className="slogon">
              <span className="smal-slog">MOVE <br /></span>
              <span className="larg-slog">FASTER</span>
            </h1>
          </div>
          <div className="slogns123" id="slogon2">
            <span className="s100">100%</span><br />
            <span className="prem">Premium Quality</span>
          </div>
          <div className="slogns123" id="but1">
            <div className="but1">
              <Link to="/gallery" className="butt1"><span className="shop1">Shop Now</span></Link>
            </div>
          </div>
        </div>
        <div className="intros"></div>
        <div className="intros">
          <div className="zalb">
            <p className="zalb2">Zero Limits</p><br />
            <p className="zalb2">All Day Comfort</p><br />
            <p className="zalb2">Light Weight Design</p><br />
            <p className="zalb2">Built to Perform</p><br />
          </div>
          <div className="slog4">
            <h1 className="slog">
              <span className="smal-slog leftslo">STEP <br /></span>
              <span className="larg-slog">FURTHER</span>
            </h1>
          </div>
        </div>
      </div>

      <section className="products-section">
        <div className="product-category">
          <h2>NEW ARRIVALS</h2>
          <p>Here are the new arrivals of SHOE HUB you like.</p>
          <div className="product-grid">
            {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>

        <Slider />

        <div className="product-category">
          <h2>OUR COLLECTION</h2>
          <p>Collection of shoes as per your expectations by SHOE HUB.</p>
          <div className="product-grid">
            {collection.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <PromoModal />
    </div>
  )
}
