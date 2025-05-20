const express = require('express');
const inventoryController = require('../controllers/inventory.controllers');
const authMidleware = require('../middleware/authMiddleware');

const router = express.Router();

//POST: / Add new inventory
router.post('/', authMidleware, inventoryController.addNewInventory);

module.exports = router;