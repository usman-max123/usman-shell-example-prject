import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

const EMPTY = { name: '', email: '', password: '', phone: '', address: '', gender: '' }

export default function Register() {
  const { register } = useShop()
  const [form, setForm] = useState(EMPTY)
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setSuccess(false)
    if (form.password.length < 6) return setError('Password must be at least 6 characters!')
    const res = await register(form)
    if (res.ok) { setError(''); setSuccess(true); setForm(EMPTY) }
    else setError(res.error)
  }

  return (
    <div className="auth-body">
      <div className="auth-container">
        <div className="auth-logo">
          <Link to="/"><img src="/images/shologo-fotor-bg-remover-20260221125934.png" alt="Logo" height="70" /></Link>
        </div>
        <h2>👟 Create Account</h2>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">Registration successful! <Link to="/login">Login now</Link></div>}

        <form onSubmit={submit}>
          <div className="input-group"><i className="fa fa-user"></i>
            <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={change} required /></div>
          <div className="input-group"><i className="fa fa-envelope"></i>
            <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={change} required /></div>
          <div className="input-group"><i className="fa fa-lock"></i>
            <input type={show ? 'text' : 'password'} name="password" placeholder="Password (min 6 chars)" value={form.password} onChange={change} required />
            <i className={`fa ${show ? 'fa-eye-slash' : 'fa-eye'} toggle-pass`} onClick={() => setShow(!show)}></i></div>
          <div className="input-group"><i className="fa fa-phone"></i>
            <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={change} required /></div>
          <div className="input-group"><i className="fa fa-map-marker-alt"></i>
            <input type="text" name="address" placeholder="Address" value={form.address} onChange={change} required /></div>
          <div className="input-group"><i className="fa fa-venus-mars"></i>
            <select name="gender" value={form.gender} onChange={change} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select></div>
          <button type="submit" className="auth-btn">Register</button>
          <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  )
}
