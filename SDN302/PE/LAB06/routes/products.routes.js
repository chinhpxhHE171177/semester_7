const express = require('express');
const { getAllProducts, createProduct } = require('../controllers/products.controllers');
const { authenticateJWT } = require('../middleware/authMiddleware');

const router = express.Router();

// GET: / Get all product route -
router.get('/all', getAllProducts);
//POST: / Create new product
router.post('/', authenticateJWT, createProduct);

module.exports = router;