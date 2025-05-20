const express = require('express');
const {
    createMovie,
    getAllMovie,
    getStarsByMovie,
    getAllMovieWithGenre,
    createMovieWithValidation
} = require('../controllers/movie.controllers');

const router = express.Router();

// POST: /create Create a new movie
// router.post('/create', createMovie);
// POST: /create Create a new movie with validation
router.post('/create', createMovieWithValidation);
// GET: / Get Alls movies 
// router.get('/', getAllMovie);
//GET: /:id/stars Get stars by movie 
router.get('/:id/stars', getStarsByMovie);
//GET: /?genre=? Get All movie by genre
router.get('/', getAllMovieWithGenre);

module.exports = router;