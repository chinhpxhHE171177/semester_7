// controllers/product.controllers.js
const Product = require('../models/product');
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');

const validateProduct = [
    body('productName')
        .trim()
        .notEmpty().withMessage('Product name is required')
        .matches(/^[a-zA-Z0-9\s/]+$/).withMessage('Product name can only contain letters, numbers, spaces, and /')
        .custom(async (value, { req }) => {
            const product = await Product.findOne({ productName: value });
            if (product && product._id.toString() !== req.params?.id) throw new Error('Product name must be unique');
        }),
    body('productDescription').notEmpty().withMessage('Description is required'),
    body('image').notEmpty().withMessage('Image URL is required'),
    body('price').isFloat({ min: 0, max: 999 }).withMessage('Price must be between 0 and 999'),
    body('category').notEmpty().withMessage('Category is required'),
];


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// View: Handle Add Product
exports.createProduct = [
    validateProduct,
    async (req, res) => {
        const errors = validationResult(req);
        const categories = await Category.find();
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() });
        }

        const { productName, productDescription, image, price, isFeature, category } = req.body;
        try {
            const product = new Product({
                productName,
                productDescription,
                image,
                price,
                isFeature,
                category
            });
            await product.save();
            res.status(201).json(product);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
];


// View: Handle Edit Product
exports.postEditProduct = [
    validateProduct,
    async (req, res) => {
        const errors = validationResult(req);
        const categories = await Category.find();
        if (!errors.isEmpty()) {
            return res.status(404).json({ categories, errors: errors.array(), product: req.body });
        }

        const { productName, productDescription, image, price, isFeature, category } = req.body;
        try {
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                { productName, productDescription, image, price, isFeature, category },
                { new: true, runValidators: true }
            );
            if (!product) return res.status(404).send('Product not found');
            res.status(200).json('Update product sucessfully!');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
];

// View: Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: "Product deleted", product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
