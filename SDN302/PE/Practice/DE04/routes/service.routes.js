const express = require('express');
const serviceController = require('../controllers/service.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//POST: /create Create a new service 
router.post('/create', authMiddleware, serviceController.createService);


module.exports = router;