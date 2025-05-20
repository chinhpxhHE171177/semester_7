// npm i mongoose 
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    des: { type: String, required: true },
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;