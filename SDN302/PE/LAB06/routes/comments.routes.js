const express = require('express');
const { createComment } = require('../controllers/comments.controllers');

const router = express.Router();

// GET: / Get all product route -
router.post('/', createComment);

module.exports = router;