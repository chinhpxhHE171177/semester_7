// models/courses.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Teacher is required!'],
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }]

}, { timestamps: true, collection: 'courses' });

module.exports = mongoose.model('course', courseSchema);