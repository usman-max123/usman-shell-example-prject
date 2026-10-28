import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-box">
          <h2>Shoes Hub</h2>
          <p>Step into comfort and style with our premium quality shoes designed for performance and everyday wear.</p>
        </div>
        <div className="footer-box">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-box">
          <h3>Contact Info</h3>
          <p><i className="fa fa-envelope"></i> shoehub@email.com</p>
          <p><i className="fa fa-phone"></i> +92 300 1234567</p>
          <p><i className="fa fa-map-marker-alt"></i> Pakistan</p>
        </div>
        <div className="footer-box">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#top"><i className="fab fa-facebook-f"></i></a>
            <a href="#top"><i className="fab fa-instagram"></i></a>
            <a href="#top"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Shoes Hub | All Rights Reserved</p>
      </div>
    </footer>
  )
}
