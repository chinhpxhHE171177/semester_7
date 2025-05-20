const mongoose = require('mongoose');
const User = require('./users');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Service name is required']
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: [true, 'Service price is required'],
        min: [50 , 'Minimum price is 50']
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Provider ID is required']
    },
    duration: {
        type: Number,
        required: [true, 'Service duration is required'],
        min: [15, 'Minimum duration is 15'],
        max: [180, 'Maximum duration is 180']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {collection: 'services'});

module.exports = mongoose.model('service', serviceSchema);