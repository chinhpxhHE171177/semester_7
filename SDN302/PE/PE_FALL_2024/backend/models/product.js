// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true, unique: true },
    productDescription: { type: String, required: false },
    image: { type: String, required: true },
    price: { type: Number, required: true, min: 0, max: 999 },
    isFeature: { type: Boolean, default: false },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;