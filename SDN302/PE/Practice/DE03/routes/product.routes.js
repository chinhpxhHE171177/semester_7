const express = require('express');
const productController = require('../controllers/product.controllers');
const authMidleware = require('../middleware/authMiddleware');

const router = express.Router();

//POST: / Add new product
router.post('/', authMidleware, productController.addNewProduct);
//POST: / List all products
router.get('/', productController.listAllProducts);

module.exports = router;