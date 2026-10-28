import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { money } from '../utils/helpers'

const navClass = ({ isActive }) => (isActive ? 'active' : '')

export default function Header() {
  const { currentUser, isAdmin, cartCount, theme, toggleTheme, searchProducts } = useShop()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const results = searchProducts(query)

  const closeSearch = () => { setOpen(false); setQuery('') }

  return (
    <header className="HEAD">
      <div id="logo">
        <Link to="/"><img src="/images/shologo-fotor-bg-remover-20260221125934.png" alt="Shoe Hub Logo" /></Link>
      </div>

      <nav className="nev" id="header">
        <ul>
          <li><NavLink to="/" end className={navClass}>Home</NavLink></li>
          <li><NavLink to="/gallery" className={navClass}>Gallery</NavLink></li>
          <li><NavLink to="/about" className={navClass}>About Us</NavLink></li>
          <li><NavLink to="/contact" className={navClass}>Contact</NavLink></li>
          {isAdmin && (
            <li><Link to="/admin" className="admin-link"><i className="fa fa-shield-halved"></i> Admin</Link></li>
          )}
        </ul>
      </nav>

      <div className="header-icons">
        {/* Live search */}
        <div className="search-wrapper">
          <input
            type="text" id="liveSearch" placeholder="Search shoes..." autoComplete="off"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
          />
          <i className="fa fa-search search-icon"></i>
          {open && query.trim().length >= 2 && (
            <div className="search-dropdown" style={{ display: 'block' }}>
              {results.length === 0 ? (
                <div className="no-result">No shoes found</div>
              ) : (
                results.map((p) => (
                  <Link key={p.id} to={`/#product-${p.id}`} className="search-item" onClick={closeSearch}>
                    <img src={p.image} alt={p.name} />
                    <div><strong>{p.name}</strong><span>{money(p.price)}</span></div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        {currentUser ? (
          <Link to="/profile" className="user-pill" title="Your Profile">
            <span className="avatar">{currentUser.name.charAt(0).toUpperCase()}</span>
            <span className="uname">{currentUser.name}</span>
          </Link>
        ) : (
          <Link to="/profile" className="icon-btn" title="Account"><i className="fa fa-user"></i></Link>
        )}

        {/* Cart */}
        <Link to="/cart" className="icon-btn cart-icon-wrap" title="Cart">
          <i className="fa fa-shopping-cart"></i>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        {/* Theme */}
        <button className="theme-toggle" title="Toggle Theme" onClick={toggleTheme}>
          <i className={theme === 'dark' ? 'fa fa-moon' : 'fa fa-sun'}></i>
        </button>
      </div>
    </header>
  )
}
