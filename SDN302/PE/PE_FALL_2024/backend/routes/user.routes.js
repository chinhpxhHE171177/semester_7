// routes/user.routes.js
const express = require('express');
const { register, login } = require('../controllers/user.controllers');

const router = express.Router();

//POST: /register Create a user account 
router.post('/register', register);
//POST: /login Sign in by user 
router.post('/login', login);

module.exports = router;