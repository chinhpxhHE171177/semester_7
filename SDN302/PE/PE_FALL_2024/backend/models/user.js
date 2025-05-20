// models/user.js
const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     password: { type: String, required: true },
// }, { timestamps: true });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false // Prevents password from being returned by default
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;