const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    discountTotal: { type: Number, required: true },
    totalProduct: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    products: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            discountPercentage: { type: Number, required: true },
            total: { type: Number, required: true }
        }
    ]
}, { collection: 'carts', timestamps: true });

const Carts = mongoose.model('carts', cartSchema);
module.exports = Carts;
