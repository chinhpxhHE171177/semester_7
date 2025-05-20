//routes/course.routes.js
const express = require('express');
const courseController = require('../controllers/course.controllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//POST: / Create a course 
router.post('/', authMiddleware, courseController.createCourses);
//GET: / Get all courses 
router.get('/', courseController.listAllCourses);
//GET: / Get all courses by author
router.get('/author', authMiddleware, courseController.allCoursesByAuthor);
//PUT: /:id Update course
router.put('/:id', authMiddleware, courseController.updateCourse);
//DELETE: /:id Delete course 
router.delete('/:id', authMiddleware, courseController.deleteCourse);

//POST: /enroll/:courseId Student enroll course 
router.post('/enroll/:courseId', authMiddleware, courseController.enrollCourse);
//POST: /my-courses View my courses
router.get('/my-courses', authMiddleware, courseController.getMyCourses);


module.exports = router;