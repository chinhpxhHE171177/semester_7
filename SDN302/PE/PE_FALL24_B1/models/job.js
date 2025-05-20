const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Job name is required']
    },
    issues: [{
        _id: false,  // Tắt tạo ID tự động
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        date: {
            type: Date,
            required: [true, 'Date is required']
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    }],
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
}, { timestamps: false, collection: 'jobs' });
module.exports = mongoose.model('job', jobSchema);