const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    path: { type: String, required: true },
    url: { type: String, required: true },
    caption: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'images' });

const Images = mongoose.model('images', imageSchema);
module.exports = Images;