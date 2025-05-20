const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true, collection: 'departments' });
module.exports = mongoose.model('department', departmentSchema);