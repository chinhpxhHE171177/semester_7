const express = require('express');
const Product = require('../models/products');
const Image = require('../models/images');
const Comment = require('../models/comments');
const User = require('../models/users');
const Cart = require('../models/carts');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


//3. Create cart (add product in cart)
router.post('/', async (req, res, next) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'UserId is required' });
        }

        const newCart = new Cart({
            discountTotal: 0,
            totalProduct: 0,
            totalQuantity: 0,
            totalPrice: 0,
            user: userId,
            products: [],
        });

        await newCart.save();

        res.status(201).json({
            newCart: {
                discountTotal: newCart.discountTotal,
                totalProduct: newCart.totalProduct,
                totalQuantity: newCart.totalQuantity,
                totalPrice: newCart.totalPrice,
                user: newCart.user,
                _id: newCart._id,
                products: newCart.products,
                __v: newCart.__v
            }
        });
    } catch (error) {
        next(error);
    }
});

//4. Add new product in cart
router.put('/', async (req, res, next) => {
    try {
        const { productId, cartId, quantity } = req.body;

        if (!productId || !cartId || !quantity) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({ message: 'Product not found' });
        }

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(400).json({ message: 'Cart is not existed' });
        }

        if (quantity > product.stock) {
            return res.status(404).json({ message: `Product don't have enough ${quantity} product. Current stock now: ${product.stock}` });
        }

        const discountAmount = product.discountPercentage / 100 * product.price * quantity;
        const totalProd = product.price * quantity;
        const totalPrice = totalProd - discountAmount;

        // const updatedCart = await Cart.findByIdAndUpdate(cartId, {
        //     $push: {
        //         products: {
        //             _id: productId,
        //             name: product.name,
        //             price: product.price,
        //             quantity: quantity,
        //             discountPercentage: product.discountPercentage,
        //             total: totalPrice
        //         }
        //     },
        //     $inc: {
        //         discountTotal: discountAmount,
        //         totalProduct: totalProd,
        //         totalQuantity: quantity,
        //         totalPrice: totalPrice
        //     }
        // }, {new: true});

        // new: treu de tra ve ban cap nhat ms nhat
        //products._id de lay tt cua sp

        cart.products.push({
            _id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            discountPercentage: product.discountPercentage,
            total: totalPrice
        });

        cart.discountTotal += discountAmount;
        cart.totalProduct += totalProd;
        cart.totalQuantity += quantity;
        cart.totalPrice += totalPrice;

        await cart.save();

        //cap nhat la kho hang san pham
        product.stock -= quantity;
        await product.save();

        res.status(200).json({
            message: {
                cart: {
                    _id: cart._id,
                    discountTotal: cart.discountTotal,
                    totalProduct: cart.totalProduct,
                    totalQuantity: cart.totalQuantity,
                    totalPrice: cart.totalPrice,
                    user: cart.user,
                    products: cart.products
                },
                __v: cart.__v
            },
            stock: product.stock,
            status: 'Successfully!'
        });

    } catch (error) {
        next(error);
    }
})

//7. Get all carts of an account (check authentication)
router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.user.id;

        const carts = await Cart.find({ user: userId }).
            populate('products._id', '_id name price quantity discountPercentage total thumbnail');

        const formattedCart = carts.map(cart => ({
            _id: cart._id,
            discountTotal: cart.discountTotal,
            totalProduct: cart.totalProduct,
            totalQuantity: cart.totalQuantity,
            totalPrice: cart.totalPrice,
            user: cart.user,
            products: cart.products.map(product => ({
                _id: product._id._id,
                name: product._id.name,
                price: product._id.price,
                quantity: product._id.quantity,
                discountPercentage: product._id.discountPercentage,
                total: cart.totalPrice,
                thumbnail: product._id.thumbnail || null
            })),
            __v: cart.__v
        }));

        res.status(200).json({
            message: 'success',
            data: formattedCart
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;