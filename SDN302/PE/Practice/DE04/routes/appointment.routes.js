const express = require('express');
const appointmentController = require('../controllers/appointment.controllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//POST: /book Booking an appointment
router.post('/book', authMiddleware, appointmentController.createAppointment);


module.exports = router;