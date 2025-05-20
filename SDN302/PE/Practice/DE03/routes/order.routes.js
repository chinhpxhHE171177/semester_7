const express = require('express');
const orderController = require('../controllers/order.controllers');
const authMidleware = require('../middleware/authMiddleware');

const router = express.Router();

//POST: / Add new order
router.post('/', authMidleware, orderController.createOrder);
//POST: / Payment order
router.post('/pay', authMidleware, orderController.paymentStatus);


module.exports = router;