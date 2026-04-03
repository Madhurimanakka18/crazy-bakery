import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span>🥐</span>
              <div>
                <div className="footer-logo-main">CRAZY BAKERY</div>
                <div className="footer-logo-sub">Freshly Baked Happiness</div>
              </div>
            </div>
            <p className="footer-desc">
              Bringing joy to Hyderabad, one bite at a time. 
              Made with love in Kompally since 2023.
            </p>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn">📸</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn">👍</a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="social-btn">💬</a>
              <a href="mailto:madhuuu184@gamil.com" className="social-btn">✉️</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Our Menu</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/menu">🎂 Cakes</Link></li>
              <li><Link to="/menu">🥐 Pastries</Link></li>
              <li><Link to="/menu">🍪 Cookies</Link></li>
              <li><Link to="/menu">🍞 Breads</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul className="contact-list">
              <li>📍 Kompally, Hyderabad - 500014</li>
              <li>
                <a href="tel:+919876543210">📞 +91 98765 43210</a>
              </li>
              <li>
                <a href="mailto:madhuuu184@gamil.com">✉️ madhuuu184@gmail.com</a>
              </li>
              <li>⏰ Mon–Sun: 7AM – 10PM</li>
            </ul>
            <div className="cta-links">
              <a href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order" target="_blank" rel="noreferrer" className="footer-cta whatsapp">
                💬 WhatsApp Order
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2023 Crazy Bakery, Kompally, Hyderabad. All rights reserved. Made with 💛</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
