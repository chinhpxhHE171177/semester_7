// controllers/lesson.controllers.js
const Lesson = require('../models/lessons');
const Course = require('../models/courses');
const User = require('../models/users');

//3.1 Add new lessons
exports.addLesson = async (req, res, next) => {
    try {
        const { courseId, title, content, resources } = req.body;
        const userId = req.user.id;

        const course = await Course.findById(courseId);

        if (!course) return res.status(404).json({ message: 'Course not found!' });

        if (course.teacherId.toString() !== userId) {
            return res.status(403).json({ message: `You are not allowed to add new lesson in the course: ${course.title}` });
        }


        const newLesson = new Lesson({
            courseId,
            title,
            content,
            resources
        });

        await newLesson.save();
        res.status(201).json({
            status: 'success',
            message: 'Add new lesson successfully!',
            lessons: {
                courses: {
                    id: course._id,
                    title: course.title
                },
                title: newLesson.title,
                content: newLesson.content,
                resources: newLesson.resources
            }
        });

    } catch (error) {
        next(error);
    }
}

//3.2 List all lessons by course 
exports.lessonByCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        // Tìm khóa học theo ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        // Kiểm tra quyền truy cập:
        // - Giáo viên chỉ có thể xem khóa học do họ tạo
        if (course.teacherId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not allowed to view lessons in this course' });
        }

        // Lấy tất cả bài học thuộc khóa học này
        const lessons = await Lesson.find({ courseId });
        if (!lessons || lessons.length === 0) {
            return res.status(404).json({ message: 'No lessons found in this course.' });
        }

        res.status(200).json({
            status: 'success',
            message: `List of lessons for course: ${course.title}`,
            course: {
                id: course._id,
                title: course.title
            },
            lessons: lessons.map(lesson => ({
                id: lesson._id,
                title: lesson.title,
                content: lesson.content,
                resources: lesson.resources
            }))
        });

    } catch (error) {
        next(error);
    }
};

//3.3. Update lesson by teacher 
exports.updateLesson = async (req, res, next) => {
    try {
        const { title, content, resources } = req.body;
        const userId = req.user.id;
        const { id } = req.params;

        if (!title || !content) {
            res.status(400).json({ message: 'Please fill all fields' })
        }

        // Find lesson by id 
        const lesson = await Lesson.findById(id);
        if (!lesson) {
            res.status(404).json({ message: 'Lesson not found!' });
        }

        // Find the course contain the lesson
        const course = await Course.findById(lesson.courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found!' });
        }

        // Kiểm tra quyền: Chỉ giáo viên tạo khóa học mới được cập nhật bài học
        if (course.teacherId.toString() !== userId) {
            return res.status(403).json({ message: `You are not allowed to update this lesson: ${title}` });
        }

        // Cập nhật thông tin bài học
        lesson.title = title || lesson.title;
        lesson.content = content || lesson.content;
        lesson.resources = resources || lesson.resources;

        await lesson.save();

        res.status(200).json({
            status: 'success',
            message: 'Lesson updated successfully!',
            lesson: {
                id: lesson._id,
                title: lesson.title,
                content: lesson.content,
                resources: lesson.resources
            }
        });

    } catch (error) {
        next(error);
    }
}


//3.4 Delete lesson by teacher 
exports.deleteLesson = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        // Find lesson by id 
        const lesson = await Lesson.findById(id);
        if (!lesson) {
            res.status(404).json({ message: 'Lesson not found!' });
        }

        // Find the course contain the lesson
        const course = await Course.findById(lesson.courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found!' });
        }

        // Kiểm tra quyền: Chỉ giáo viên tạo khóa học mới được cập nhật bài học
        if (course.teacherId.toString() !== userId) {
            return res.status(403).json({ message: `You are not allowed to delete this lesson` });
        }

        await lesson.deleteOne();

        res.status(200).json({
            status: 'success',
            message: 'Lesson deleted successfully!',
            // lesson: {
            //     id: lesson._id,
            //     title: lesson.title,
            //     content: lesson.content,
            //     resources: lesson.resources
            // }
        });

    } catch (error) {
        next(error);
    }
}