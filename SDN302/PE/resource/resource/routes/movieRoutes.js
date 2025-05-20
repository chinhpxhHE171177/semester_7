const express = require('express');
const { createMovie, listMovies, getMovieByStar, countMoviesByDirector, addStarsToMovie } = require('../controllers/movieController');

const router = express.Router();


//POST: /create Create a new movie 
router.post('/create', createMovie);
// GET: /list Get All movies 
router.get('/list', listMovies);
// GET: /by-star/:starId GET movies by star
router.get('/by-star/:starId', getMovieByStar);
// GET: /count-by-director/:directorName COUNT MOVIE BY DIRECTOR NAME
router.get('/count-by-director/:directorName', countMoviesByDirector);
// PUT: '/:movieId/add-stars
router.put('/:movieId/add-stars', addStarsToMovie);


module.exports = router;