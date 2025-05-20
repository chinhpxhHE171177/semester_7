const express = require('express');
const userController = require('../controllers/user.controllers');

const router = express.Router();

//POST: /register Register an account 
router.post('/register', userController.register);
//POST: /login Login an account 
router.post('/login', userController.login);

module.exports = router;