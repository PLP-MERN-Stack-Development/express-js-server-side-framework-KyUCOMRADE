// server.js - Express.js RESTful API Assignment (Week 2)

// Load environment variables from .env
require('dotenv').config();

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ------------------------------
// Middleware
// ------------------------------

// Parse incoming JSON
app.use(bodyParser.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${req.ip}`);
  next();
});

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = process.env.AUTH_TOKEN;

  if (!authHeader || authHeader !== `Bearer ${token}`) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
  }
  next();
};

// Validation middleware for creating/updating products
const validateProduct = (req, res, next) => {
  const { name, description, price, category } = req.body;
  if (!name || !description || price === undefined || !category) {
    return res.status(400).json({ message: 'Validation error: name, description, price, and category are required.' });
  }
  next();
};

// ------------------------------
// In-memory Products Database
// ------------------------------
let products = [
  { id: '1', name: 'Laptop', description: 'High-performance laptop with 16GB RAM', price: 1200, category: 'electronics', inStock: true },
  { id: '2', name: 'Smartphone', description: 'Latest model with 128GB storage', price: 800, category: 'electronics', inStock: true },
  { id: '3', name: 'Coffee Maker', description: 'Programmable coffee maker with timer', price: 50, category: 'kitchen', inStock: false }
];

// ------------------------------
// Routes
// ------------------------------

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Visit /api/products to view all products.');
});

// GET /api/products - List all products with optional search, filter, pagination
app.get('/api/products', (req, res) => {
  let result = products;
  const { category, page = 1, limit = 2, search } = req.query;

  if (category) result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = result.slice(start, end);

  res.json({
    total: result.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginated
  });
});

// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /api/products - Create new product (protected)
app.post('/api/products', authenticate, validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: uuidv4(), name, description, price, category, inStock: inStock ?? true };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update product (protected)
app.put('/api/products/:id', authenticate, (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const { name, description, price, category, inStock } = req.body;
  if (name) product.name = name;
  if (description) product.description = description;
  if (price !== undefined) product.price = price;
  if (category) product.category = category;
  if (inStock !== undefined) product.inStock = inStock;

  res.json(product);
});

// DELETE /api/products/:id - Delete product (protected)
app.delete('/api/products/:id', authenticate, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted successfully', deleted });
});

// GET /api/products/stats - Product statistics by category
app.get('/api/products/stats', (req, res) => {
  const stats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  res.json(stats);
});

// ------------------------------
// Global Error Handler
// ------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

// ------------------------------
// Start Server
// ------------------------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

module.exports = app;
