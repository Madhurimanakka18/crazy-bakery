import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Menu.css';

const CATEGORIES = ['All', 'Cakes', 'Pastries', 'Cookies', 'Breads'];

const FALLBACK = [
  { id: 1, name: 'Chocolate Truffle Cake', category: 'Cakes', price: 599, image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', description: 'Rich dark chocolate layers with velvety ganache' },
  { id: 2, name: 'Strawberry Dream Cake', category: 'Cakes', price: 649, image_url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400', description: 'Fresh strawberries with whipped cream' },
  { id: 3, name: 'Red Velvet Cake', category: 'Cakes', price: 699, image_url: 'https://images.unsplash.com/photo-1551404973-761c83cd8339?w=400', description: 'Classic red velvet with cream cheese frosting' },
  { id: 4, name: 'Mango Delight Cake', category: 'Cakes', price: 549, image_url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400', description: 'Tropical mango mousse cake' },
  { id: 5, name: 'Butter Croissant', category: 'Pastries', price: 89, image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', description: 'Flaky, buttery French-style croissant' },
  { id: 6, name: 'Almond Danish', category: 'Pastries', price: 99, image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', description: 'Danish pastry filled with almond cream' },
  { id: 7, name: 'Chocolate Eclair', category: 'Pastries', price: 79, image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', description: 'Choux pastry with chocolate glaze' },
  { id: 8, name: 'Fruit Tart', category: 'Pastries', price: 149, image_url: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400', description: 'Crispy tart with fresh seasonal fruits' },
  { id: 9, name: 'Choco Chip Cookies', category: 'Cookies', price: 199, image_url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400', description: 'Classic chewy chocolate chip cookies (6 pcs)' },
  { id: 10, name: 'Oatmeal Raisin Cookies', category: 'Cookies', price: 179, image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', description: 'Wholesome oatmeal raisin cookies (6 pcs)' },
  { id: 11, name: 'Butter Shortbread', category: 'Cookies', price: 159, image_url: 'https://images.unsplash.com/photo-1590080875897-c32eb9e50f78?w=400', description: 'Melt-in-mouth butter shortbread (6 pcs)' },
  { id: 12, name: 'Macarons Box', category: 'Cookies', price: 349, image_url: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400', description: 'Assorted French macarons (6 pcs)' },
  { id: 13, name: 'Sourdough Loaf', category: 'Breads', price: 179, image_url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400', description: 'Artisan sourdough with crispy crust' },
  { id: 14, name: 'Multigrain Bread', category: 'Breads', price: 149, image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', description: 'Nutritious multigrain sandwich loaf' },
  { id: 15, name: 'Garlic Herb Focaccia', category: 'Breads', price: 199, image_url: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=400', description: 'Italian flat bread with herbs and garlic' },
  { id: 16, name: 'Cinnamon Roll', category: 'Breads', price: 89, image_url: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400', description: 'Soft, gooey cinnamon swirl roll' },
];

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data.data);
    } catch {
      setProducts(FALLBACK);
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter(p => {
    const matchCat = active === 'All' || p.category === active;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="menu-page">
      <div className="page-header">
        <h1>Our Menu</h1>
        <p>From dreamy cakes to crispy breads — baked fresh every day</p>
        <div className="divider" />
      </div>

      {/* Search + Filter */}
      <div className="menu-controls">
        <div className="search-box">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search for items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button onClick={() => setSearch('')} className="clear-search">✕</button>}
        </div>

        <div className="category-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`cat-tab ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat === 'All' && '🍽️ '}
              {cat === 'Cakes' && '🎂 '}
              {cat === 'Pastries' && '🥐 '}
              {cat === 'Cookies' && '🍪 '}
              {cat === 'Breads' && '🍞 '}
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-body container">
        {loading ? (
          <div className="loading-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <span>🍰</span>
            <h3>No items found</h3>
            <p>Try a different search or category</p>
          </div>
        ) : (
          <>
            <div className="results-count">{filtered.length} items</div>
            <div className="products-grid">
              {filtered.map((product, i) => (
                <div key={product.id} style={{ animationDelay: `${i * 0.05}s` }} className="fade-in">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
