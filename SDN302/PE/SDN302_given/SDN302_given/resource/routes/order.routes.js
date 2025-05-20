const express = require('express');
const Product = require('../models/products');
const Category = require('../models/categories');
const Order = require('../models/orders');
const Customer = require('../models/customers');

const router = express.Router();

//Q2.
router.get('/customer/:customerId', async (req, res, next) => {
    try {
        const { customerId } = req.params;

        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found!' });
        }

        const orders = await Order.find({ customerId })
            .populate('products.productId')

        if (!orders) {
            return res.status(404).json({ message: 'Order not found!' });
        }

        const formattedOrder = orders.map(order => ({
            _id: order._id,
            orderDate: order.orderDate,
            products: order.products.map(prod => ({
                _id: prod.productId._id,
                name: prod.productId.name,
                price: prod.productId.price
            }))
        }))

        res.status(200).json(formattedOrder);
    } catch (error) {
        next(error);
    }
});

//Q3. 
router.get('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId)
            .populate('customerId', '_id name email')
            .populate('products.productId', '_id name price quantity')

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            _id: order._id,
            orderDate: order.orderDate,
            customer: {
                _id: order.customerId._id,
                name: order.customerId.name,
                email: order.customerId.email
            },
            products: order.products.map(prod => ({
                _id: prod.productId._id,
                name: prod.productId.name,
                price: prod.productId.price,
                quantity: prod.quantity
            })),
            totalPrice: order.totalPrice,
        });
    } catch (error) {
        next(error);
    }
})

//Q4.
router.post('/create', async (req, res, next) => {
    try {
        const { customerId, products } = req.body;

        const newOrder = new Order({
            customerId,
            products: {
                productId,
                quantity
            }
        });

        await newOrder.save();

        const order = await Order.findById(newOrder._id).
            populate('products.productId')

        order.totalPrice = order.prod.productId.price * newOrder.quantity;
        await order.save();

        res.status(201).json({
            _id: newOrder._id,
            customerId: newOrder.customerId,
            orderDate: newOrder.orderDate,
            products: order.products.map(prod => ({
                _id: prod.productId._id,
                name: prod.productId.name,
                price: prod.productId.price,
            })),
            totalPrice: order.totalPrice
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;