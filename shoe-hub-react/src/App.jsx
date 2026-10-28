import { Routes, Route, Link } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProductForm from './pages/admin/ProductForm'

function NotFound() {
  return (
    <div className="auth-body">
      <div className="auth-container" style={{ textAlign: 'center' }}>
        <h2>404 - Page not found</h2>
        <Link to="/" className="auth-btn" style={{ display: 'block', textDecoration: 'none' }}>Back to Home</Link>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Pages that share Header + Footer */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Full-page screens */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin only */}
      <Route path="/admin" element={<RequireAuth admin><AdminDashboard /></RequireAuth>} />
      <Route path="/admin/products/new" element={<RequireAuth admin><ProductForm /></RequireAuth>} />
      <Route path="/admin/products/:id/edit" element={<RequireAuth admin><ProductForm /></RequireAuth>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
