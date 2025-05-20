// routes/productRoutes.js
const express = require('express');
const { getAllProduct, createProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET: / Get all product route -
router.get('/', getAllProduct);
// POST: /create Create a new product
router.post('/create', authMiddleware, createProduct);

module.exports = router;