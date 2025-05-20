const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointment',
        required: [true, 'Appointment ID is required']
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Customer ID is required']
    },
    amount: {
        type: Number
    },
    paymentMethod: {
        type: String,
        enum: ['wallet', 'credit-card']
    },
    status: {
        type: String,
        default: 'completed'
    },
    transactionDate: {
        type: Date,
        default: Date.now
    }
}, { collection: 'payments' });

module.exports = mongoose.model('payment', paymentSchema);