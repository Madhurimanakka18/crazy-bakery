import emailjs from '@emailjs/browser';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [placing, setPlacing] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!form.name) { toast.error('Please enter your name!'); return; }
    if (cart.length === 0) { toast.error('Your cart is empty!'); return; }

    setPlacing(true);
    const items = cart.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      const res = await axios.post('/order', {
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone,
        items,
      });
      if (res.data.success) {
        setOrdered(true);
        setOrderId(res.data.order_id);
        clearCart();
        toast.success('🎉 Order placed successfully!');
        emailjs.send(
  'service_urjt5sq',
  'template_o8d3wrj',
  {
    name: form.name,
    email: form.email,
    phone: form.phone,
    message: `New Order #${res.data.order_id} placed! Items: ${cart.map(i => i.name + ' x' + i.quantity).join(', ')}. Total: ₹${totalPrice}`,
  },
  'shqUMSS4krkL2iMs4'
);
      }
    } catch {
      // Fallback for when backend not running
      setOrdered(true);
      setOrderId(Math.floor(Math.random() * 9000) + 1000);
      clearCart();
      toast.success('🎉 Order placed! (Demo mode)');
      emailjs.send(
  'service_urjt5sq',
  'template_o8d3wrj',
  {
    name: form.name,
    email: form.email,
    phone: form.phone,
    message: `New Order #${orderId} placed! Items: ${cart.map(i => i.name + ' x' + i.quantity).join(', ')}. Total: ₹${totalPrice}`,
  },
  'shqUMSS4krkL2iMs4'
);
    } finally {
      setPlacing(false);
    }
  };

  if (ordered) {
    return (
      <div className="cart-page">
        <div className="order-success">
          <div className="success-icon">🎉</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you, <strong>{form.name || 'Dear Customer'}</strong>!</p>
          <p>Your order <strong>#{orderId}</strong> has been placed successfully.</p>
          <p className="success-sub">We'll bake it fresh and deliver it soon. 🍰</p>
          <div className="success-actions">
            <Link to="/menu" className="btn-primary">🛒 Continue Shopping</Link>
            <a
              href="https://wa.me/919876543210?text=Hi!%20I%20just%20placed%20order%20%23{orderId}%20on%20Crazy%20Bakery"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              💬 Confirm on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="page-header">
          <h1>Your Cart</h1>
          <p>Review your delicious selections</p>
          <div className="divider" />
        </div>
        <div className="empty-cart">
          <span>🛒</span>
          <h3>Your cart is empty!</h3>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/menu" className="btn-primary">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>Your Cart</h1>
        <p>{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
        <div className="divider" />
      </div>

      <div className="cart-body container">
        {/* Cart Items */}
        <div className="cart-items">
          <div className="cart-header-row">
            <h2>Cart Items</h2>
            <button onClick={clearCart} className="clear-cart-btn">🗑 Clear All</button>
          </div>

          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image_url}
                alt={item.name}
                className="cart-item-img"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=100'; }}
              />
              <div className="cart-item-info">
                <div>
                  <h3>{item.name}</h3>
                  <span className="cart-item-cat">{item.category}</span>
                </div>
                <div className="cart-item-controls">
                  <div className="qty-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <span className="cart-item-price">₹{(item.price * item.quantity).toFixed(0)}</span>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Panel */}
        <div className="checkout-panel">
          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            {cart.map(item => (
              <div key={item.id} className="summary-row">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(0)}</span>
              </div>
            ))}
            <div className="summary-row subtotal">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(0)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="free-delivery">FREE 🎉</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(0)}</span>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleCheckout} className="checkout-form">
            <h2>Your Details</h2>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>

            <button type="submit" className="btn-primary checkout-btn" disabled={placing}>
              {placing ? '⏳ Placing Order...' : `🛒 Place Order — ₹${totalPrice.toFixed(0)}`}
            </button>

            <div className="or-divider">or</div>

            <a
              href={`https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order:%0A${cart.map(i => `${i.name}%20x${i.quantity}`).join('%0A')}%0A%0ATotal:%20₹${totalPrice.toFixed(0)}`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-order-btn"
            >
              💬 Order via WhatsApp
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
