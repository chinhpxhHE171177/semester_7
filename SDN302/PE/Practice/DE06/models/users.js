const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, 'User name is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    email: { type: String, required: [true, 'Email is required'] },
}, { collection: 'users' });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('user', userSchema);