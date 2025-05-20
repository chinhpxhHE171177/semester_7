const express = require('express');
const Product = require('../models/products');
const Category = require('../models/categories');

const router = express.Router();

//Q1.
router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find().
            populate('category')

        if (!products) {
            return res.status(404).json({ message: 'The list of products is empty!' });
        }

        const formattedproduct = products.map(product => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category
        }));

        res.status(200).json(formattedproduct);
    } catch (error) {
        next(error);
    }
});

module.exports = router;