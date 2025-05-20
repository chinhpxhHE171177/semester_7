const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true, collection: 'producers' });

const Producers = mongoose.model('producer', producerSchema);
module.exports = Producers;