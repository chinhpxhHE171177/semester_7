const express = require('express');
const { createUser, login } = require('../controllers/user.controllers');

const router = express.Router();

// POST: / Create a new user
router.post('/', createUser);
//POTS: /login Sign in by user 
router.post('/login', login);

module.exports = router;
