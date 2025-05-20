const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String },
    price:
    {
        type: Number,
        required: [true, "Price is required"],
        min: 0
    },
    category:
    {
        type: String,
        required: [true, 'Category is required']
    }
}, { timestamps: true, collection: 'products' });


module.exports = mongoose.model('product', productSchema);