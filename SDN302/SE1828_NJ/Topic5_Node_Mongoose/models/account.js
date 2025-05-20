const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const accountSchema = new mongoose.Schema({
    username: { type: String, required: [true, 'Username is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    phone: { type: String },
    address: { type: String }
});

// Tien hanh ma hoa password truoc khi thuc hien ham save --> chen dl vao db
accountSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('Account', accountSchema);