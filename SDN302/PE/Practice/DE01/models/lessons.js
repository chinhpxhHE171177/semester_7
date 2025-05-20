// models/lessons.js
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    courseId: 
    {
        type: mongoose.Schema.ObjectId,
        ref: 'course',
        required: [true, 'Course is required']
    },
    title: 
    {
        type: String, 
        required: true,
        trim: true
    },
    content: 
    {
        type: String,
        trim: true
    },
    resources: 
    [{
        type: String,
        trim: true,
        default: []
    }]
}, {timestamps: true, collection: 'lessons'});

module.exports = mongoose.model('lesson', lessonSchema);