const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/users'); // Đảm bảo đường dẫn đúng
const Course = require('../models/courses'); // Đảm bảo đường dẫn đúng
const Lesson = require('../models/lessons'); // Đảm bảo đường dẫn đúng
const Enrollment = require('../models/enrollments'); // Đảm bảo đường dẫn đúng

// Lấy danh sách khóa học (có phân trang & bộ lọc theo giảng viên)
router.get('/', async (req, res, next) => {
    try {
        let { page = 1, limit = 10, teacherId } = req.query;

        // Chuyển đổi thành số nguyên để tránh lỗi NaN
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const query = {};
        if (teacherId) {
            query.instructor = teacherId;
        }

        // Đếm tổng số khóa học (để tính tổng số trang)
        const totalCourses = await Course.countDocuments(query);

        const courses = await Course.find(query)
            .populate('instructor', '_id fullname')
            .populate('students', '_id fullname')
            //.populate('lessons.lessonId', 'title order isPublished') // Sửa lỗi populate
            .populate('lessons', 'title order isPublished') // Sửa lỗi populate
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 }) // Sắp xếp khóa học mới nhất lên đầu
            .exec();

        const formattedCourses = courses.map(course => {
            return {
                _id: course._id,
                title: course.title,
                description: course.description,
                price: course.price,
                duration: course.duration,
                level: course.level,
                instructor: course.instructor,
                students: course.students,
                schedule: course.schedule,
                lessons: course.lessons
                    .filter(lesson => lesson.isPublished)
                    .sort((a, b) => a.order - b.order),
                    // .map(lesson => lesson._id),
                enrolledStudents: course.students.length
            }
        })

        res.json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalCourses / limit),
            totalCourses,
            formattedCourses,
        });
    } catch (error) {
        next(error);
    }
});


// Dang ký khóa học
router.post('/enroll', authMiddleware, async (req, res, next) => {
    try {
        const { courseId } = req.body;
        const studentId = req.user.id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            })
        }

        const user = await User.findById(studentId);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found'
            })
        }

        // Kiem tra xem hoc vien da dang ky khoa hoc nay chua 
        if (course.students.includes(studentId)) {
            return res.status(400).json({
                status: false,
                messgae: 'You already enrolled this course'
            })
        }

        // Them moi enrollment do sv dk 
        const enrollment = new Enrollment({
            course: courseId,
            student: studentId
        });
        await enrollment.save();

        // cap nhat danh sach hoc vien o khoa hoc 
        course.students.push(studentId);
        await course.save();

        res.status(201).json({
            message: 'Enrollment successful',
            enrollment: {
                _id: enrollment._id,
                student: {
                    _id: user._id,
                    name: user.fullname
                },
                course: {
                    _id: course._id,
                    title: course.title
                },
                status: enrollment.status,
                enrollmentDate: enrollment.enrolledAt
            }
        });

    } catch (error) {
        next(error);
    }
})


// Thêm bài giảng mới
router.post('/:courseId/lessons', async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const newLesson = new Lesson({
            courseId,
            title,
            content,
            isPublished: true
        });

        await newLesson.save();

        // Cập nhật danh sách bài giảng trong khóa học
        course.lessons.push(newLesson._id);
        //course.lessons.push({ lessonId: newLesson._id });
        await course.save();

        res.status(201).json({
            success: true,
            message: 'Lesson added successfully',
            lesson: {
                _id: newLesson._id,
                title: newLesson.title,
                content: {
                    text: newLesson.content.text,
                    videoUrl: newLesson.content.videoUrl,
                    attachments: newLesson.content.attachments
                }
            },
            course: course.title
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
