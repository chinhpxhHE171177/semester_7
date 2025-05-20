const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 },
    brand: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images:
        [{
            type: mongoose.Schema.ObjectId,
            ref: 'images'
        }],
    comments: [{
        type: mongoose.Schema.ObjectId,  // Tham chiếu đến model Comments
        ref: 'comments'
    }]
}, { timestamps: true, collection: 'products' });

const Products = mongoose.model('products', productSchema);
module.exports = Products;