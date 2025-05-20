const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'User is required']
    },
    roomId: {
        type: mongoose.Schema.ObjectId,
        ref: 'room',
        required: [true, 'Room is required']
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true, collection: 'bookings' });

module.exports = mongoose.model('booking', bookingSchema);