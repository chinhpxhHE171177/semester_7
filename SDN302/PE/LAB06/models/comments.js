const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, // Tham chiếu đến users
}, { timestamps: true, collection: 'comments' });

const Comments = mongoose.model('comments', commentSchema);
module.exports = Comments;
