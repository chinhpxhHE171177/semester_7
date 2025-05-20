const product = require('../models/product');
const Product = require('../models/product');
const User = require('../models/user');


exports.addNewProduct = async (req, res, next) => {
    try {
        const { name, description, price, category } = req.body;
        const userId = req.user.id;

        // Find the user by id 
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ status: 401, message: 'User not found!' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ status: 403, message: 'Permission denied' });
        }

        const newProduct = new Product({ name, description, price, category });
        await newProduct.save();

        res.status(201).json({
            status: 201,
            message: 'Add new product successfully!',
            newProduct
        });
    } catch (error) {
        next(error);
    }
}

exports.listAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();

        if (products.length === 0) {
            return res.status(400).json({ status: 400, message: 'No products' });
        }

        res.status(200).json({
            status: 200,
            message: 'List of products',
            products
        });
    } catch (error) {
        next(error);
    }
}