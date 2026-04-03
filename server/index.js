const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'crazy_bakery',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = pool.promise();

// Test DB connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ DB Connection Error:', err.message);
    console.log('⚠️  Running in demo mode (no DB)');
  } else {
    console.log('✅ MySQL Connected!');
    connection.release();
  }
});

// =============================================
// Demo data fallback (when no DB)
// =============================================
const demoProducts = [
  { id: 1, name: 'Chocolate Truffle Cake', category: 'Cakes', price: 599, image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', description: 'Rich dark chocolate layers with velvety ganache' },
  { id: 2, name: 'Strawberry Dream Cake', category: 'Cakes', price: 649, image_url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400', description: 'Fresh strawberries with whipped cream' },
  { id: 3, name: 'Red Velvet Cake', category: 'Cakes', price: 699, image_url: 'https://th.bing.com/th/id/OIP.YCOt_xhQYoZsg9iSzskhvAHaHa?w=206&h=206&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', description: 'Classic red velvet with cream cheese frosting' },
  { id: 4, name: 'Mango Delight Cake', category: 'Cakes', price: 549, image_url: 'https://th.bing.com/th/id/OIP.KDMG08n0kHKqq3Geosu6RgHaHb?w=184&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', description: 'Tropical mango mousse cake' },
  { id: 5, name: 'Butter Croissant', category: 'Pastries', price: 125, image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', description: 'Flaky, buttery French-style croissant' },
  { id: 6, name: 'Almond Danish', category: 'Pastries', price: 119, image_url: 'https://tse4.mm.bing.net/th/id/OIP.bJAr3JHAz7TE6yjCRxfHYAHaHa?pid=Api&P=0&h=180', description: 'Danish pastry filled with almond cream' },
  { id: 7, name: 'Chocolate Eclair', category: 'Pastries', price: 79, image_url: 'https://tse1.mm.bing.net/th/id/OIP.j6j-mrzjmj69uMItUm6LeQHaE9?pid=Api&P=0&h=180', description: 'Choux pastry with chocolate glaze' },
  { id: 8, name: 'Fruit Tart', category: 'Pastries', price: 149, image_url: 'https://tse2.mm.bing.net/th/id/OIP.mNqyZYbod6vP05bpBgBMcgHaHP?pid=Api&P=0&h=180', description: 'Crispy tart with fresh seasonal fruits' },
  { id: 9, name: 'Choco Chip Cookies', category: 'Cookies', price: 159, image_url: 'https://tse3.mm.bing.net/th/id/OIP.fP0r5Emt6wt4okVIC_IpCgHaHa?pid=Api&P=0&h=180', description: 'Classic chewy chocolate chip cookies (6 pcs)' },
  { id: 10, name: 'Oatmeal Raisin Cookies', category: 'Cookies', price: 179, image_url: 'https://tse4.mm.bing.net/th/id/OIP.8Fyng95An1ky4jRnakE7ZQHaKX?pid=Api&P=0&h=180', description: 'Wholesome oatmeal raisin cookies (6 pcs)' },
  { id: 11, name: 'Butter Shortbread', category: 'Cookies', price: 140, image_url: 'https://tse3.mm.bing.net/th/id/OIP.3H4Lf5rOqPLXAC90qI2YoAHaF7?pid=Api&P=0&h=180', description: 'Melt-in-mouth butter shortbread (6 pcs)' },
  { id: 12, name: 'Macarons Box', category: 'Cookies', price: 349, image_url: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400', description: 'Assorted French macarons (6 pcs)' },
  { id: 13, name: 'Sourdough Loaf', category: 'Breads', price: 179, image_url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400', description: 'Artisan sourdough with crispy crust' },
  { id: 14, name: 'Multigrain Bread', category: 'Breads', price: 200, image_url: 'https://tse1.mm.bing.net/th/id/OIP.m32NelmTATj8izvmwZcJ6AHaHa?pid=Api&P=0&h=180', description: 'Nutritious multigrain sandwich loaf' },
  { id: 15, name: 'Garlic Herb Focaccia', category: 'Breads', price: 199, image_url: 'https://tse4.mm.bing.net/th/id/OIP.o4_DMJrwoDexOuSRDnhPsQHaHa?pid=Api&P=0&h=180', description: 'Italian flat bread with herbs and garlic' },
  { id: 16, name: 'Cinnamon Roll', category: 'Breads', price: 89, image_url: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400', description: 'Soft, gooey cinnamon swirl roll' }
];

const demoOrders = [];

// =============================================
// ROUTES
// =============================================

// GET /products
app.get('/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products ORDER BY category, id');
    res.json({ success: true, data: rows });
  } catch (err) {
    // Fallback to demo data
    res.json({ success: true, data: demoProducts, demo: true });
  }
});

// GET /products/:id
app.get('/products/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    const product = demoProducts.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product, demo: true });
  }
});

// POST /order
app.post('/order', async (req, res) => {
  const { customer_name, customer_email, customer_phone, items } = req.body;
  if (!customer_name || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  try {
    const [orderResult] = await db.query(
      'INSERT INTO orders (customer_name, customer_email, customer_phone, total_amount) VALUES (?, ?, ?, ?)',
      [customer_name, customer_email, customer_phone, total]
    );
    const orderId = orderResult.insertId;
    for (const item of items) {
      await db.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.price]
      );
    }
    res.json({ success: true, message: 'Order placed successfully!', order_id: orderId, total });
  } catch (err) {
    // Demo fallback
    const orderId = demoOrders.length + 1;
    demoOrders.push({ id: orderId, customer_name, customer_email, customer_phone, items, total, date: new Date() });
    res.json({ success: true, message: 'Order placed successfully! (Demo Mode)', order_id: orderId, total, demo: true });
  }
});

// GET /orders
app.get('/orders', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT o.*, GROUP_CONCAT(p.name SEPARATOR ', ') as items_summary
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      GROUP BY o.id
      ORDER BY o.date DESC
    `);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.json({ success: true, data: demoOrders, demo: true });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: '🍰 CRAZY BAKERY API is running!', status: 'OK' });
});
const path = require('path');

// Serve React frontend
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
