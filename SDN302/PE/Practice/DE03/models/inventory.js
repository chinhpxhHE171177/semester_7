const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'product',
        required: [true, 'Product is required']
    },
    stock: { type: Number, min: 0 },
    address: { type: String }
}, { timestamps: true, collection: 'inventories' });


module.exports = mongoose.model('inventory', inventorySchema);