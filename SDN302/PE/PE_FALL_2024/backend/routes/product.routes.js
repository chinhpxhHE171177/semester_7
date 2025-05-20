// routes/product.routes.js
const express = require('express');
const { getAllProducts, createProduct, postEditProduct, deleteProduct } = require('../controllers/product.controllers');
const { authenticateJWT } = require('../Middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/add-product', authenticateJWT, createProduct);
router.put('/edit-product/:id', authenticateJWT, postEditProduct);
router.delete('/delete-product/:id', authenticateJWT, deleteProduct);

module.exports = router;