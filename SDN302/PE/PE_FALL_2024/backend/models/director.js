const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    dob: { type: Date, required: true },
    nationality: { type: String, required: true }
}, { timestamps: true, collection: 'directors' }
);

const Directors = mongoose.model('director', directorSchema);
module.exports = Directors;