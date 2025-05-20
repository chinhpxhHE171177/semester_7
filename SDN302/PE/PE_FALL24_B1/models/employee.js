const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: [true, 'First name is required']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required']
        },
        middleName: {
            type: String,
            required: false
        }
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    manager: {
        type: String,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department'
    },
    account: {
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        }
    },
    dependents: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        fullname: {
            type: String
        },
        relation: {
            type: String
        }
    }],
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job'
    }]
}, {timestamps: false, collection: 'employees'});
module.exports = mongoose.model('employee', empSchema);