const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: [true, 'Room number is required'], unique: true},
    type: {
        type: String,
        enum: ['single', 'double', 'suite'],
        required: [true, 'Type roome is required']
    },
    price: { type: Number, required: [true, 'Price is required'], min: 500000, max: 3500000 },
    status: {
        type: String,
        enum: ['available', 'booked'],
        default: 'available'
    }
}, { timestamps: true, collection: 'rooms' });

module.exports = mongoose.model('room', roomSchema);