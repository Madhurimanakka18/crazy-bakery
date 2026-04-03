import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Home.css';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=1400',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400',
  'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=1400',
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    fetchFeatured();
    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchFeatured = async () => {
    try {
      const res = await axios.get('/products');
      setFeatured(res.data.data.slice(0, 4));
    } catch {
      // Use static data if API fails
      setFeatured([
        { id: 1, name: 'Chocolate Truffle Cake', category: 'Cakes', price: 599, image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', description: 'Rich dark chocolate layers with velvety ganache' },
        { id: 5, name: 'Butter Croissant', category: 'Pastries', price: 89, image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', description: 'Flaky, buttery French-style croissant' },
        { id: 9, name: 'Choco Chip Cookies', category: 'Cookies', price: 199, image_url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400', description: 'Classic chewy chocolate chip cookies (6 pcs)' },
        { id: 13, name: 'Sourdough Loaf', category: 'Breads', price: 179, image_url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400', description: 'Artisan sourdough with crispy crust' },
      ]);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          {HERO_IMAGES.map((img, i) => (
            <div
              key={i}
              className={`hero-slide ${i === heroIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">🥐 Kompally, Hyderabad</div>
          <h1 className="hero-title">
            <span className="hero-crazy">CRAZY</span>
            <br />
            <span className="hero-bakery">BAKERY</span>
          </h1>
          <p className="hero-tagline">Freshly Baked Happiness</p>
          <p className="hero-sub">
            Handcrafted with love every morning. From dreamy cakes to crispy breads —
            taste the magic of Kompally's favourite bakery.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn-primary">
              🍰 Explore Menu
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20from%20Crazy%20Bakery"
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              💬 Order on WhatsApp
            </a>
          </div>
          <div className="hero-dots">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === heroIndex ? 'active' : ''}`}
                onClick={() => setHeroIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="stats-container">
          {[
            { emoji: '🎂', value: '50+', label: 'Menu Items' },
            { emoji: '😊', value: '10K+', label: 'Happy Customers' },
            { emoji: '⭐', value: '4.9', label: 'Rating' },
            { emoji: '🏠', value: 'Fresh', label: 'Daily Baked' },
          ].map(({ emoji, value, label }) => (
            <div key={label} className="stat-item">
              <span className="stat-emoji">{emoji}</span>
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-title">
            <h2>What We Bake</h2>
            <p>Every day, fresh from our oven to your table</p>
            <div className="divider" />
          </div>
          <div className="category-grid">
            {[
              { name: 'Cakes', emoji: '🎂', desc: 'Custom cakes for every occasion', color: '#fde8d8', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300' },
              { name: 'Pastries', emoji: '🥐', desc: 'Flaky, buttery French classics', color: '#fdf0e0', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300' },
              { name: 'Cookies', emoji: '🍪', desc: 'Crisp, chewy and irresistible', color: '#fce8d5', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300' },
              { name: 'Breads', emoji: '🍞', desc: 'Artisan breads baked fresh daily', color: '#f5e8d0', img: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300' },
            ].map(({ name, emoji, desc, img }) => (
              <Link to="/menu" key={name} className="category-card">
                <div className="cat-img-wrap">
                  <img src={img} alt={name} />
                  <div className="cat-overlay" />
                </div>
                <div className="cat-info">
                  <span className="cat-emoji">{emoji}</span>
                  <h3>{name}</h3>
                  <p>{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="featured-section">
        <div className="container">
          <div className="section-title">
            <h2>Today's Picks</h2>
            <p>Our bakers' special selections just for you</p>
            <div className="divider" />
          </div>
          <div className="products-grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/menu" className="btn-primary">View Full Menu →</Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="why-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Us?</h2>
            <p>Because ordinary just doesn't cut it</p>
            <div className="divider" />
          </div>
          <div className="why-grid">
            {[
              { icon: '🌅', title: 'Baked Fresh Daily', desc: 'Everything is baked fresh every morning — no day-old anything.' },
              { icon: '🧈', title: 'Real Ingredients', desc: 'Premium butter, farm-fresh eggs, finest chocolate. No compromises.' },
              { icon: '🎨', title: 'Custom Cakes', desc: 'Special occasions deserve special cakes. Custom orders welcome!' },
              { icon: '🚀', title: 'Quick Delivery', desc: 'Fast delivery within Kompally and nearby areas.' },
              { icon: '💛', title: 'Made with Love', desc: 'Each item handcrafted by our passionate bakers, every single time.' },
              { icon: '📍', title: 'Local Favourite', desc: 'Proudly serving Kompally, Hyderabad since 2019.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="why-card">
                <span className="why-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Indulge?</h2>
          <p>Order now and get fresh-baked goodness delivered to your door!</p>
          <div className="cta-actions">
            <Link to="/menu" className="btn-primary">🛒 Order Now</Link>
            <a
              href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20from%20Crazy%20Bakery"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              💬 Chat with Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
