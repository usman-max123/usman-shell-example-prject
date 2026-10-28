import { Navigate, useLocation } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

// Route guard: only logged-in users (and admins, if admin=true) may see the page
export default function RequireAuth({ children, admin = false }) {
  const { currentUser, isAdmin } = useShop()
  const location = useLocation()
  if (!currentUser) return <Navigate to="/login" replace state={{ msg: 'login_required', from: location.pathname }} />
  if (admin && !isAdmin) return <Navigate to="/" replace />
  return children
}
