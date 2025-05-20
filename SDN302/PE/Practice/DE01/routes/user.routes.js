// routes/user.routes.js
const express = require('express');
const userController = require('../controllers/user.controllers');

const router = express.Router();

//POST: /register Dang ky tai khoan 
router.post('/register', userController.register);
//POST: /login Dang nhap nguoi dung 
router.post('/login', userController.login);

module.exports = router;