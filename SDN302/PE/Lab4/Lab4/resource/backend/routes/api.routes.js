const express = require('express');
const tutorialController = require('../controllers/tutorials.controllers');

const router = express.Router();

router.get('/', tutorialController.getAllTutorials);
router.get('/:id/comments', tutorialController.getCommentByTutorialId);
router.post('/:id/comments', tutorialController.createComment);

module.exports = router;