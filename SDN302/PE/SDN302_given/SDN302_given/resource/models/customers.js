const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    }

}, { collection: 'customers' });

module.exports = mongoose.model('customer', customerSchema);