const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'User is required']
    },
    products: [{
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: 'product',
            required: [true, 'Product is required']
        },
        quantity: { type: Number, min: 1 }
    }],
    totalPrice: {
        type: Number,
        min: 1
    },
    status: {
        type: String,
        enum: ['pending', 'confirm', 'completed'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid']
    },
    address: { type: String },
}, { timestamps: true, collection: 'orders' });


module.exports = mongoose.model('order', orderSchema);