// controllers/orderController.js
const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');

// Lấy tất cả đơn hàng
exports.getAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate('customer', 'name email')
            .populate('products.product', 'name price');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

// Tạo đơn hàng mới (không dùng transaction)
exports.createOrder = async (req, res, next) => {
    try {
        const { products } = req.body;
        const customerId = req.user?.userId; // Lấy từ token qua middleware

        console.log('Request Body:', req.body); // Debug
        console.log('Customer ID from Token:', customerId); // Debug

        // Validation cơ bản
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Products array is required' });
        }

        if (!customerId) {
            return res.status(401).json({ message: 'Unauthorized: Customer ID not found in token' });
        }

        // Kiểm tra customer tồn tại
        const customerExists = await mongoose.model('Customer').findById(customerId);
        if (!customerExists) {
            return res.status(400).json({ message: 'Invalid customer ID from token' });
        }

        // Kiểm tra và cập nhật stock
        let totalPrice = 0;
        for (const item of products) {
            const { product: productId, quantity } = item;

            if (!productId || !quantity) {
                return res.status(400).json({ message: 'Product ID and quantity are required for each item' });
            }

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(400).json({ message: `Product ID ${productId} not found` });
            }

            if (product.stock < quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${quantity}`,
                });
            }

            totalPrice += product.price * quantity;
            product.stock -= quantity;
            await product.save(); // Lưu từng sản phẩm
        }

        // Tạo order
        const newOrder = new Order({
            customer: customerId,
            products,
            totalPrice,
        });
        const savedOrder = await newOrder.save();

        const populatedOrder = await Order.findById(savedOrder._id)
            .populate('customer', 'name email')
            .populate('products.product', 'name price');

        res.status(201).json(populatedOrder);
    } catch (error) {
        console.error('Create Order Error:', error); // Debug
        next(error);
    }
};

// Export với middleware
module.exports = {
    getAllOrder: exports.getAllOrder,
    createOrder: [authMiddleware, exports.createOrder],
};