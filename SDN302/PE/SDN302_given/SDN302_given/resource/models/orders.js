const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: [true, 'Customer is required']
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        quantity: {
            type: Number
        }
    }],
    totalPrice: {
        type: Number
    },
    orderDate: {
        type: Date,
        default: Date.now()
    }

}, { collection: 'orders' });

module.exports = mongoose.model('order', orderSchema);