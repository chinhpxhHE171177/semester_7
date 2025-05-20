// routes/orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', orderController.getAllOrder);
router.post('/create', authMiddleware, orderController.createOrder);

module.exports = router;