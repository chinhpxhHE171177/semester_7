// models/category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true, unique: true },
    categoryDescription: { type: String, required: false },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;