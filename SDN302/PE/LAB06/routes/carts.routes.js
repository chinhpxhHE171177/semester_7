const express = require('express');
const { createCart, addToCart, getAllCarts } = require('../controllers/carts.controllers');
const { authenticateJWT } = require('../middleware/authMiddleware');

const router = express.Router();

// POST: / Create a new cart 
router.post('/', createCart);
//PUT: / Add Product to cart 
router.put('/', addToCart);
//GET: Get all cart of an account
router.get('/', authenticateJWT, getAllCarts);

module.exports = router;