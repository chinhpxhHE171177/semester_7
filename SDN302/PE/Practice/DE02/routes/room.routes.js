const express = require('express');
const roomController = require('../controllers/room.controllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//GET: / Get all rooms
// router.get('/', roomController.getAllRooms);
//GET: / Get all rooms (filter)
router.get('/', roomController.getRooms);
//POST: / Add new room
router.post('/', authMiddleware, roomController.addNewRoom);
//PUT: / Update info room
router.put('/:id', authMiddleware, roomController.updateRoom);
//DELETE: / delete room
router.delete('/:id', authMiddleware, roomController.deleteRoom);

module.exports = router;