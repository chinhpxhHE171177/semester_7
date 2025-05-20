const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    release: { type: Date, required: true },
    description: { type: String },
    producer: {
        type: mongoose.Schema.ObjectId,
        ref: 'producer',
        required: true
    },
    director: {
        type: mongoose.Schema.ObjectId,
        ref: 'director',
        required: true
    },
    genres: [{ type: String, default: [] }],
    stars: [{
        type: mongoose.Schema.ObjectId,
        ref: 'star',
        required: true
    }]
}, { timestamps: true, collection: 'movies' });

const Movies = mongoose.model('movie', movieSchema);
module.exports = Movies;