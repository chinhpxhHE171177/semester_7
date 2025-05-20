const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    title: { type: String, required: [true, 'Title is required'] },
    content: {
        text: {
            type: String,
            default: ""
        },
        videoUrl: {
            type: String,
            default: ""
        },
        attachments: {
            type: [String], // Danh sách file đính kèm
            default: []
        }
    },
    order: {
        type: Number,
        min: 0,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, collection: 'lessons' });

module.exports = mongoose.model('lesson', lessonSchema);