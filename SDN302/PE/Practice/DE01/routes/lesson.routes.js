// routes/lesson.routes.js
const express = require('express');
const lessonController = require('../controllers/lesson.controllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//POST: / Add new lesson
router.post('/', authMiddleware, lessonController.addLesson);
//GET: /course Get All lessons by course
router.get('/:courseId/course', authMiddleware, lessonController.lessonByCourse);
//PUT: /:id Update lesson by teacher (who created the lesson)
router.put('/:id', authMiddleware, lessonController.updateLesson);
//DELETE: /:id Delete lesson by teacher (who created the lesson)
router.delete('/:id', authMiddleware, lessonController.deleteLesson);


module.exports = router;