const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Title is required'] },
    body: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true, collection: 'comments' });

module.exports = mongoose.model('comment', commentSchema);