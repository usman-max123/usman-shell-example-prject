import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../../context/ShopContext'
import { formatDate, money } from '../../utils/helpers'

const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

// One row of the orders table with its own "status" dropdown + save button
function OrderRow({ order, customer }) {
  const { updateOrderStatus } = useShop()
  const [status, setStatus] = useState(order.status)
  return (
    <tr>
      <td>#{order.id}</td>
      <td>{customer?.name || 'Deleted user'}</td>
      <td>{customer?.email || '-'}</td>
      <td>{money(order.total)}</td>
      <td><span className={`status-badge ${order.status}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
      <td>{formatDate(order.createdAt)}</td>
      <td>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            style={{ padding: '4px 8px', borderRadius: 6, fontSize: '.85rem', background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--border)' }}>
            {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <button className="edit-btn" title="Save" onClick={() => updateOrderStatus(order.id, status)}>
            <i className="fa fa-save"></i>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function AdminDashboard() {
  const { currentUser, products, users, orders, messages, deleteProduct, logout, resetDemoData } = useShop()
  const navigate = useNavigate()

  const doLogout = (e) => { e.preventDefault(); logout(); navigate('/login', { state: { msg: 'logout' } }) }
  const reset = () => {
    if (window.confirm('Reset ALL products, users, orders and messages back to the starting demo data?')) {
      resetDemoData(); navigate('/login')
    }
  }

  return (
    <div className="admin-body">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <img src="/images/shologo-fotor-bg-remover-20260221125934.png" alt="Logo" height="60" />
          <p>Admin Panel</p>
        </div>
        <nav>
          <a href="#products" className="active"><i className="fa fa-box"></i> Products</a>
          <a href="#users"><i className="fa fa-users"></i> Users</a>
          <a href="#orders"><i className="fa fa-receipt"></i> Orders</a>
          <a href="#messages"><i className="fa fa-envelope"></i> Messages</a>
          <Link to="/"><i className="fa fa-home"></i> View Site</Link>
          <a href="/login" onClick={doLogout}><i className="fa fa-sign-out-alt"></i> Logout</a>
        </nav>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <h1>Welcome, {currentUser.name}!</h1>
        </div>

        <div className="admin-stats">
          <div className="stat-card"><i className="fa fa-box"></i><h3>{products.length}</h3><p>Products</p></div>
          <div className="stat-card"><i className="fa fa-users"></i><h3>{users.length}</h3><p>Users</p></div>
          <div className="stat-card"><i className="fa fa-receipt"></i><h3>{orders.length}</h3><p>Orders</p></div>
          <div className="stat-card"><i className="fa fa-envelope"></i><h3>{messages.length}</h3><p>Messages</p></div>
        </div>

        {/* Products */}
        <section id="products" className="admin-section">
          <div className="section-header">
            <h2><i className="fa fa-box"></i> Products</h2>
            <Link to="/admin/products/new" className="add-btn"><i className="fa fa-plus"></i> Add Product</Link>
          </div>
          <div className="table-wrap">
            <table className="admin-table">
              <thead><tr><th>ID</th><th>Image</th><th>Name</th><th>Price</th><th>Category</th><th>Stock</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td><img src={p.image} alt={p.name} width="50" style={{ borderRadius: 5 }} /></td>
                    <td>{p.name}</td>
                    <td>{money(p.price)}</td>
                    <td>{p.category}</td>
                    <td>{p.stock}</td>
                    <td>
                      <Link to={`/admin/products/${p.id}/edit`} className="edit-btn"><i className="fa fa-edit"></i></Link>
                      <a href="#products" className="delete-btn"
                        onClick={(e) => { e.preventDefault(); if (window.confirm('Delete this product?')) deleteProduct(p.id) }}>
                        <i className="fa fa-trash"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Users */}
        <section id="users" className="admin-section">
          <h2><i className="fa fa-users"></i> Registered Users</h2>
          <div className="table-wrap">
            <table className="admin-table">
              <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th></tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.phone || '-'}</td>
                    <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
                    <td>{formatDate(u.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Orders */}
        <section id="orders" className="admin-section">
          <h2><i className="fa fa-receipt"></i> Orders</h2>
          <div className="table-wrap">
            <table className="admin-table">
              <thead><tr><th>ID</th><th>Customer</th><th>Email</th><th>Total</th><th>Status</th><th>Date</th><th>Update</th></tr></thead>
              <tbody>
                {orders.length === 0 && <tr><td colSpan="7">No orders yet.</td></tr>}
                {orders.map((o) => (
                  <OrderRow key={`${o.id}-${o.status}`} order={o} customer={users.find((u) => u.id === o.userId)} />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Messages */}
        <section id="messages" className="admin-section">
          <h2><i className="fa fa-envelope"></i> Contact Messages</h2>
          <div className="table-wrap">
            <table className="admin-table">
              <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr></thead>
              <tbody>
                {messages.length === 0 && <tr><td colSpan="5">No messages yet.</td></tr>}
                {messages.map((m) => (
                  <tr key={m.id}>
                    <td>{m.id}</td><td>{m.name}</td><td>{m.email}</td>
                    <td>{m.message.length > 80 ? `${m.message.slice(0, 80)}...` : m.message}</td>
                    <td>{formatDate(m.sentAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <button className="add-btn" style={{ border: 'none', cursor: 'pointer' }} onClick={reset}>
          <i className="fa fa-rotate-left"></i> Reset Demo Data
        </button>
      </div>
    </div>
  )
}
