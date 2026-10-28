import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

export default function Login() {
  const { login } = useShop()
  const navigate = useNavigate()
  const location = useLocation()
  const msg = location.state?.msg
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const res = await login(form.email, form.password)
    if (res.ok) navigate(location.state?.from || '/', { replace: true })
    else setError(res.error)
  }

  return (
    <div className="auth-body">
      <div className="auth-container">
        <div className="auth-logo">
          <Link to="/"><img src="/images/shologo-fotor-bg-remover-20260221125934.png" alt="Logo" height="70" /></Link>
        </div>
        <h2>👟 Welcome Back</h2>

        {error && <div className="alert alert-error">{error}</div>}
        {msg === 'login_required' && <div className="alert alert-error">Please login to add items to cart!</div>}
        {msg === 'logout' && <div className="alert alert-success">Logged out successfully!</div>}

        <form onSubmit={submit}>
          <div className="input-group">
            <i className="fa fa-envelope"></i>
            <input type="email" placeholder="Email Address" required
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="input-group">
            <i className="fa fa-lock"></i>
            <input type={show ? 'text' : 'password'} placeholder="Password" required
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <i className={`fa ${show ? 'fa-eye-slash' : 'fa-eye'} toggle-pass`} onClick={() => setShow(!show)}></i>
          </div>
          <button type="submit" className="auth-btn">Login</button>
          <p className="auth-link">Don't have an account? <Link to="/register">Register</Link></p>
        </form>
      </div>
    </div>
  )
}
