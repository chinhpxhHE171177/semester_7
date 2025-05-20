const mongoose = require('mongoose');
const Comment = require('./comments.js');

const ImagesSchema = new mongoose.Schema({
    path: { type: String },
    url: { type: String },
    caption: { type: String }
});

const TutorialsSchema = new mongoose.Schema({
    title: { type: String },
    author: { type: String },
    images: [ImagesSchema],
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'comment'
    }],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'category',
        required: true
    },
    tags: { type: [String], default: [] }
}, { collection: "tutorials" }

);

const Tutorial = mongoose.model("tutorial", TutorialsSchema);
module.exports = Tutorial;