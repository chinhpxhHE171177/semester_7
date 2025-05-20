const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Customer ID is required']
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service',
        required: [true, 'Service ID is required']
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Provider ID is required']
    },
    appointmentTime: {
        type: Date,
        required: [true, 'Appointment time is required']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid'],
        default: 'unpaid'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {collection: 'appointments'});

module.exports = mongoose.model('appointment', appointmentSchema);