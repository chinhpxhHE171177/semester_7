const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Title is required'] },
    description: { type: String },
    price: { type: Number, required: [true, 'Price is required'] },
    duration: { type: Number, required: [true, 'Duration is required'] },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    schedule: {
        startDate: { type: Date, required: [true, 'Start date is required'] },
        endDate: { type: Date, required: [true, 'End date is required'] },
        timeSlots: [{
            "day": { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
            "startTime": { type: String },
            "endTime": { type: String }
        }]
    },
    lessons: [{
        // lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lesson'
        // }
    }]
});

module.exports = mongoose.model('course', courseSchema);