const express = require('express');
const bookingController = require('../controllers/booking.controllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


//POST: / Booking rooms
router.post('/', authMiddleware, bookingController.bookingRoom);
//GET: / Get List booking (Admin/User)
router.get('/', authMiddleware, bookingController.getBookings);
//PUT: /:id Cancelled booking (Admin/User)
router.put('/:id', authMiddleware, bookingController.cancelBooking);


module.exports = router;