// models/order.js
// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     customer: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Customer',
//         required: true
//     },
//     products: [{
//         product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//         quantity: { type: Number, required: true, min: 1 }
//     }],
//     totalPrice: { type: Number, required: true, min: 0 },
//     orderDate: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Order", orderSchema);

// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'Customer is required'],
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Product is required'],
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required'],
                min: [1, 'Quantity must be at least 1'],
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price cannot be negative'],
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
});

// Index để tìm kiếm nhanh theo customer và orderDate
orderSchema.index({ customer: 1, orderDate: -1 });

module.exports = mongoose.model('Order', orderSchema);