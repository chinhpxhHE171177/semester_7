const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }

}, { collection: 'products' });

module.exports = mongoose.model('product', productSchema);