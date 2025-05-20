const express = require('express');
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middleware/authenticationMiddelware');

const router = express.Router();

//POST: / Sign up new an account
router.post('/signup', accountController.createAccount);
//POST: /Sign in an account
router.post('/signin', accountController.signIn);
//GET: /testauth
router.get('/testauth', authMiddleware, accountController.testAuth)


module.exports = router;