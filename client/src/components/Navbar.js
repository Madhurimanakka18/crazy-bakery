import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🥐</span>
          <div className="logo-text">
            <span className="logo-main">CRAZY</span>
            <span className="logo-sub">BAKERY</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {[
            { path: '/', label: 'Home' },
            { path: '/menu', label: 'Menu' },
            { path: '/about', label: 'About Us' },
            { path: '/contact', label: 'Contact' },
          ].map(({ path, label }) => (
            <li key={path}>
              <Link to={path} className={`nav-link ${location.pathname === path ? 'active' : ''}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Controls */}
        <div className="nav-controls">
          {/* Theme Toggle */}
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Cart */}
          <Link to="/cart" className="cart-btn">
            <span>🛒</span>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {/* WhatsApp Find Us */}
          <a
            href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20from%20Crazy%20Bakery"
            target="_blank"
            rel="noreferrer"
            className="find-us-btn"
          >
            📍 Find Us
          </a>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {[
            { path: '/', label: '🏠 Home' },
            { path: '/menu', label: '🍰 Menu' },
            { path: '/about', label: '📖 About Us' },
            { path: '/contact', label: '📞 Contact' },
            { path: '/cart', label: `🛒 Cart${totalItems > 0 ? ` (${totalItems})` : ''}` },
          ].map(({ path, label }) => (
            <Link key={path} to={path} className="mobile-link">
              {label}
            </Link>
          ))}
          <a
            href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20from%20Crazy%20Bakery"
            target="_blank"
            rel="noreferrer"
            className="mobile-link whatsapp"
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
