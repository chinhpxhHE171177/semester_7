const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    discountTotal: { type: Number },
    totalProduct: { type: Number },
    totalQuantity: { type: Number },
    totalPrice: { type: Number },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            discountPercentage: { type: Number, required: true },
            total: { type: Number, required: true }
        }
    ]
}, { timestamps: true, collection: 'carts' });

module.exports = mongoose.model('cart', cartSchema);