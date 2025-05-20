const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: { type: String }
}, {collection: 'categories'});

module.exports = mongoose.model('category', categorySchema);