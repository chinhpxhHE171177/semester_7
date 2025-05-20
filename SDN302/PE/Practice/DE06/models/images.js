const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
    path: { type: String, required: [true, 'Path is required'] },
    url: { type: String, required: [true, 'Url is required'] },
    caption: { type: String },
    createAt: { type: Date, default: Date.now() }
}, { collection: 'images' });

module.exports = mongoose.model('image', imageSchema);