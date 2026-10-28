import { useState } from 'react'
import { useShop } from '../context/ShopContext'

export default function Contact() {
  const { saveMessage, currentUser } = useShop()
  const [form, setForm] = useState({ name: currentUser?.name || '', email: currentUser?.email || '', message: '' })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return setError('All fields are required!')
    saveMessage({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() })
    setError('')
    setSuccess('Message sent successfully! We will get back to you soon.')
    setForm({ ...form, message: '' })
  }

  return (
    <>
      <div className="page-banner">
        <h1>Contact Us</h1>
        <p>Have questions? We'd love to hear from you!</p>
      </div>
      <section className="contact-section">
        <div className="contact-grid">
          <div className="contact-form-box">
            <h2>Send a Message</h2>
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={submit}>
              <div className="input-group">
                <i className="fa fa-user"></i>
                <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={change} required />
              </div>
              <div className="input-group">
                <i className="fa fa-envelope"></i>
                <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={change} required />
              </div>
              <div className="input-group textarea-group">
                <i className="fa fa-comment"></i>
                <textarea name="message" rows="5" placeholder="Write your message..." value={form.message} onChange={change} required />
              </div>
              <button type="submit" className="auth-btn">Send Message <i className="fa fa-paper-plane"></i></button>
            </form>
          </div>
          <div className="contact-info-box">
            <h2>Our Info</h2>
            <div className="info-item"><i className="fa fa-envelope"></i><div><strong>Email</strong><p>shoehub@email.com</p></div></div>
            <div className="info-item"><i className="fa fa-phone"></i><div><strong>Phone</strong><p>+92 300 1234567</p></div></div>
            <div className="info-item"><i className="fa fa-map-marker-alt"></i><div><strong>Location</strong><p>Pakistan</p></div></div>
            <div className="info-item"><i className="fa fa-clock"></i><div><strong>Hours</strong><p>Mon-Sat: 9AM - 8PM</p></div></div>
          </div>
        </div>
      </section>
    </>
  )
}
