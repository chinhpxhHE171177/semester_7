const express = require('express');
const Product = require('../models/products');
const Image = require('../models/images');
const Comment = require('../models/comments');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//1. Get All product (if stock > 0)
router.get('/all', async (req, res, next) => {
    try {
        const products = await Product.find({ stock: { $gt: 0 } })
            .populate('comments', '-createdAt -updatedAt -__v');

        if (!products) {
            return res.status(404).json({ message: 'List of product is empty' });
        }

        // const getAllProduct = products.filter(product => product.stock > 0).map(product => ({
        //     _id: product._id,
        //     name: product.name,
        //     description: product.description,
        //     stock: product.stock > 9 ? 'many products left' : 'little stock left',
        //     images: product.images.map(image => ({
        //         _id: image._id,
        //         url: image.url,
        //         caption: image.caption
        //     }))
        // }));

        const getAllProduct = products.map(product => ({
            _id: product._id,
            name: product.name,
            description: product.description,
            stock: product.stock > 9 ? 'many products left' : 'little stock left',
            images: product.images.map(image => ({
                _id: image._id,
                url: image.url,
                caption: image.caption
            }))
        }));

        res.status(200).json({
            data: getAllProduct,
            totalProduct: products.length
        });

    } catch (error) {
        next(error);
    }
});


//6. Create product have authentication
router.post('/', authMiddleware, async (req, res, next) => {
    try {
        const { name, description, price, discountPercentage, stock, brand, thumbnail } = req.body;

        const newProduct = new Product({ name, description, price, discountPercentage, stock, brand, thumbnail });
        await newProduct.save();

        res.status(201).json({
            message: 'Created product successfully!',
            data: {
                name: newProduct.name,
                description: newProduct.description,
                price: newProduct.price,
                discountPercentage: newProduct.discountPercentage,
                stock: newProduct.stock,
                brand: newProduct.brand,
                thumbnail: newProduct.thumbnail,
                images: newProduct.images,
                comments: newProduct.comments,
                createdAt: newProduct.createdAt,
                updatedAt: newProduct.updatedAt,
                __v: newProduct.__v
            }
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;