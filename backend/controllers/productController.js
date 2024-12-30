const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('../models/ProductModel'); // 从 ProductModel.js 引入模型

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// [GET] /products - Get all products with optional filtering, sorting, and pagination
app.get('/api/products', async (req, res) => {
  try {
    const { orderBy = 'createdAt', order = 'asc', page = 1, limit = 10, searchStr } = req.query;

    const filter = searchStr
      ? { name: { $regex: searchStr, $options: 'i' } } // Case-insensitive search by name
      : {};

    const sort = { [orderBy]: order === 'asc' ? 1 : -1 };

    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalItems = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      products,
      pagination: { page: parseInt(page), limit: parseInt(limit), totalPages, totalItems },
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// [POST] /products - Add a new product (Admin only)
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product', details: err.message });
  }
});

// [PUT] /products/:id - Update a product (Admin only)
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
});

// [DELETE] /products/:id - Delete a product (Admin only)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.i
