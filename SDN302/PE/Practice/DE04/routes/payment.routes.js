const express = require('express');
const paymentController = require('../controllers/payment.Controllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//POST: /process Payment
router.post('/process', authMiddleware, paymentController.payment);

module.exports = router;