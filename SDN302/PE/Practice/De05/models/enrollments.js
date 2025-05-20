const mongoose = require('mongoose');

const enrollSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
    },
    status: {
        type: String,
        enum: ['learning', 'completed', 'cancelled'],
        default: 'learning'
    },
    enrolledAt: {
        type: Date,
        default: Date.now()
    },
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    feedback: {
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            default: ''
        }
    }
}, { timestamps: true, collection: 'enrollments' });

module.exports = mongoose.model('enrollment', enrollSchema);