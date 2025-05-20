const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

//POST: /register Register a new user 
router.post('/register', userController.register);
//POST: /login Login a user 
router.post('/login', userController.login);


module.exports = router;