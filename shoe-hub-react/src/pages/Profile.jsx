import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { formatDate, money } from '../utils/helpers'

const STEPS = ['pending', 'processing', 'shipped', 'delivered']
const ICONS = { pending: 'fa-clock', processing: 'fa-cog', shipped: 'fa-truck', delivered: 'fa-check-circle' }

export default function Profile() {
  const { currentUser: user, isAdmin, logout, updateProfile, myOrders, cancelOrder } = useShop()
  const navigate = useNavigate()
  const [tab, setTab] = useState('info')
  const [form, setForm] = useState({
    name: user?.name || '', phone: user?.phone || '', gender: user?.gender || '', address: user?.address || '',
  })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  /* ----- Guest ----- */
  if (!user) {
    return (
      <div className="profile-wrap">
        <div className="guest-card">
          <div className="ghost-avatar"><i className="fa fa-user"></i></div>
          <h2>HELLO, GUEST</h2>
          <p>You're not signed in yet. Login to view your profile, manage orders, and check your cart.</p>
          <div className="guest-actions">
            <Link to="/login" className="btn-primary"><i className="fa fa-sign-in-alt"></i> Login</Link>
            <Link to="/register" className="btn-ghost"><i className="fa fa-user-plus"></i> Create Account</Link>
          </div>
        </div>
      </div>
    )
  }

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const save = (e) => {
    e.preventDefault()
    if (!form.name.trim()) { setSuccess(''); return setError('Name cannot be empty.') }
    updateProfile(form)
    setError('')
    setSuccess('Profile updated successfully!')
  }

  const cancel = (id) => {
    if (window.confirm('Cancel this order?')) { cancelOrder(id); setError(''); setSuccess('Order cancelled successfully.') }
  }

  const doLogout = () => { logout(); navigate('/login', { state: { msg: 'logout' } }) }
  const showTab = (t) => { setTab(t); setSuccess(''); setError('') }

  return (
    <div className="profile-wrap">
      <div className="profile-card">
        <div className="profile-cover"></div>
        <div className="profile-head">
          <div className="profile-avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div className="profile-name">
            <h1>{user.name}</h1>
            <p><i className="fa fa-envelope"></i> {user.email}</p>
            <span className="role-tag">{user.role}</span>
          </div>
        </div>

        <div className="profile-body">
          <div className="profile-tabs">
            <button className={`profile-tab ${tab === 'info' ? 'active' : ''}`} onClick={() => showTab('info')}><i className="fa fa-user"></i> My Info</button>
            <button className={`profile-tab ${tab === 'edit' ? 'active' : ''}`} onClick={() => showTab('edit')}><i className="fa fa-edit"></i> Edit Profile</button>
            <button className={`profile-tab ${tab === 'orders' ? 'active' : ''}`} onClick={() => showTab('orders')}><i className="fa fa-receipt"></i> My Orders</button>
          </div>

          {success && <div className="alert alert-success"><i className="fa fa-check-circle"></i> {success}</div>}
          {error && <div className="alert alert-error"><i className="fa fa-exclamation-circle"></i> {error}</div>}

          {/* Info tab */}
          {tab === 'info' && (
            <div className="tab-content active">
              <div className="profile-info-actions">
                <button type="button" className="edit-trigger" onClick={() => showTab('edit')}>
                  <i className="fa fa-pen-to-square"></i> Edit Profile
                </button>
              </div>
              <div className="profile-grid">
                <div className="profile-field"><label>Full Name</label><span><i className="fa fa-user"></i>{user.name}</span></div>
                <div className="profile-field"><label>Email</label><span><i className="fa fa-envelope"></i>{user.email}</span></div>
                <div className="profile-field"><label>Phone</label><span><i className="fa fa-phone"></i>{user.phone || '-'}</span></div>
                <div className="profile-field"><label>Gender</label><span><i className="fa fa-venus-mars"></i>{user.gender || '-'}</span></div>
                <div className="profile-field" style={{ gridColumn: '1/-1' }}><label>Address</label><span><i className="fa fa-map-marker-alt"></i>{user.address || '-'}</span></div>
                <div className="profile-field"><label>Member Since</label><span><i className="fa fa-calendar"></i>{formatDate(user.createdAt)}</span></div>
              </div>
            </div>
          )}

          {/* Edit tab */}
          {tab === 'edit' && (
            <div className="tab-content active">
              <form className="edit-profile-form" onSubmit={save}>
                <div className="form-row">
                  <div className="form-group">
                    <label><i className="fa fa-user"></i> Full Name</label>
                    <input type="text" name="name" value={form.name} onChange={change} required />
                  </div>
                  <div className="form-group">
                    <label><i className="fa fa-phone"></i> Phone</label>
                    <input type="text" name="phone" value={form.phone} onChange={change} placeholder="e.g. +92 300 1234567" />
                  </div>
                </div>
                <div className="form-group">
                  <label><i className="fa fa-venus-mars"></i> Gender</label>
                  <select name="gender" value={form.gender} onChange={change}>
                    <option value="">-- Select --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label><i className="fa fa-map-marker-alt"></i> Address</label>
                  <textarea name="address" rows="2" value={form.address} onChange={change} placeholder="Your delivery address" />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 8 }}>
                  <i className="fa fa-save"></i> Save Changes
                </button>
              </form>
            </div>
          )}

          {/* Orders tab */}
          {tab === 'orders' && (
            <div className="tab-content active">
              {myOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                  <i className="fa fa-box-open" style={{ fontSize: '2.5rem', marginBottom: 12, display: 'block' }}></i>
                  <p>You have no orders yet.</p>
                  <Link to="/" className="btn-primary" style={{ marginTop: 12, display: 'inline-block' }}>
                    <i className="fa fa-shopping-bag"></i> Shop Now
                  </Link>
                </div>
              ) : (
                <div className="orders-list">
                  {myOrders.map((o) => {
                    const idx = STEPS.indexOf(o.status) // -1 when cancelled
                    return (
                      <div className="order-card" key={o.id}>
                        <div className="order-card-header">
                          <div>
                            <strong>Order #{o.id}</strong>
                            <span className="order-date"><i className="fa fa-calendar"></i> {formatDate(o.createdAt)}</span>
                          </div>
                          <span className={`status-badge ${o.status}`}>{o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span>
                        </div>
                        <div className="order-card-body">
                          <p className="order-items">{o.items.map((i) => `${i.name} × ${i.qty}`).join(', ')}</p>
                          <div className="order-track">
                            {STEPS.map((step, i) => (
                              <span key={step} style={{ display: 'contents' }}>
                                <div className={`track-step ${idx >= 0 && i <= idx ? 'done' : ''} ${i === idx ? 'active' : ''}`}>
                                  <div className="track-dot"><i className={`fa ${ICONS[step]}`}></i></div>
                                  <span>{step.charAt(0).toUpperCase() + step.slice(1)}</span>
                                </div>
                                {i < STEPS.length - 1 && <div className={`track-line ${idx >= 0 && i < idx ? 'done' : ''}`}></div>}
                              </span>
                            ))}
                          </div>
                          <div className="order-total">
                            Total: <strong>{money(o.total)}</strong>
                            {o.status === 'pending' && (
                              <button className="btn-danger btn-sm" onClick={() => cancel(o.id)}>
                                <i className="fa fa-times"></i> Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          <div className="profile-actions">
            <Link to="/cart" className="btn-ghost"><i className="fa fa-shopping-cart"></i> My Cart</Link>
            {isAdmin && <Link to="/admin" className="btn-primary"><i className="fa fa-shield-halved"></i> Open Admin Panel</Link>}
            <button className="btn-danger" style={{ marginLeft: 'auto' }} onClick={doLogout}>
              <i className="fa fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
