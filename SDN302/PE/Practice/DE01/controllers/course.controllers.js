// controllers/course.controllers.js
const Course = require('../models/courses');
const User = require('../models/users');
const authMiddleware = require('../middleware/authMiddleware');

//2.1 Create a new Courses (admin, teacher)
// exports.createCourses = async (req, res, next) => {
//     try {
//         const { title, description, teacherId, students } = req.body;

//         // Kiem tra thieu du lieu
//         if (!title || !teacherId) {
//             return res.status(400).json({ message: 'Please fill all fields' });
//         }

//         // Kiem tra giao vien co ton tai khong
//         const teacher = await User.findById(teacherId);
//         if (!teacher) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         // Chi cho phep teacher hoac admin tao khoa hoc
//         if (!['teacher', 'admin'].includes(teacher.role)) {
//             return res.status(403).json({ message: 'Only teachers or admins can be assigned as course instructors.' });
//         }

//         // Kiểm tra danh sách học sinh (nếu có)
//         let validStudents = [];
//         if (students && students.length > 0) {
//             validStudents = await User.find({ _id: { $in: students }, role: 'student' });

//             if (validStudents.length !== students.length) {
//                 return res.status(400).json({ message: 'Some students are invalid or not found.' });
//             }
//         }

//         // Tao khoa hoc moi 
//         const newCourse = new Course({
//             title,
//             description,
//             teacherId,
//             students: validStudents.map(student => student._id),
//         });

//         await newCourse.save();

//         res.status(201).json({
//             message: 'Course created successfully!',
//             course: newCourse,
//         });

//     } catch (error) {
//         next(error);
//     }
// }

//2.1 Create a new Courses (admin, teacher)
exports.createCourses = async (req, res, next) => {
    try {
        const { title, description, students } = req.body;
        const teacherId = req.user.id; // lay teacherId tu token

        // Kiem tra thieu du lieu
        if (!title || !teacherId) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // Kiem tra giao vien co ton tai khong
        const teacher = await User.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Chi cho phep teacher hoac admin tao khoa hoc
        if (!['teacher', 'admin'].includes(teacher.role)) {
            return res.status(403).json({ message: 'Only teachers or admins can be assigned as course instructors.' });
        }

        // Kiểm tra danh sách học sinh (nếu có)
        let validStudents = [];
        if (students && students.length > 0) {
            validStudents = await User.find({ _id: { $in: students }, role: 'student' });

            if (validStudents.length !== students.length) {
                return res.status(400).json({ message: 'Some students are invalid or not found.' });
            }
        }

        // Tao khoa hoc moi 
        const newCourse = new Course({
            title,
            description,
            teacherId,
            students: validStudents.map(student => student._id),
        });

        await newCourse.save();

        res.status(201).json({
            message: 'Course created successfully!',
            course: newCourse,
        });

    } catch (error) {
        next(error);
    }
}

//2.1 List all courses 
exports.listAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find()
            .populate('teacherId', '-password -createdAt -updatedAt -__v')
            .populate('students', '-password -createdAt -updatedAt -role -__v')

        const formattedCourses = courses.map(course => ({
            id: course._id,
            title: course.title,
            description: course.description,
            teacher: course.teacherId ? {
                id: course.teacherId._id,
                name: course.teacherId.fullname,
                email: course.teacherId.email,
                role: course.teacherId.role
            } : null,
            students: course.students.map(student => ({
                id: student._id,
                name: student.fullname,
                email: student.email
            })),
            total_students: course.students.length,
            created_at: course.createdAt
        }));

        res.status(200).json({
            status: 'success',
            message: "List of all courses",
            total_courses: courses.length,
            courses: formattedCourses
        });
    } catch (error) {
        next(error);
    }
}

//2.1.1 List all courses by author (lap teacher, moi course deu hien lai thong tin teacher)
// exports.allCoursesByAuthor = async (req, res, next) => {
//     try {
//         const author = req.user.id;

//         // Kiểm tra xem người dùng có tồn tại không
//         const teacher = await User.findById(author);
//         if (!teacher) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         // Chỉ cho phép teacher hoặc admin xem danh sách khóa học
//         if (!['teacher', 'admin'].includes(teacher.role)) {
//             return res.status(403).json({ message: 'You have no right to create a course, so there is no course here' });
//         }

//         // Tìm tất cả các khóa học của giáo viên này
//         const courses = await Course.find({ teacherId: author })
//             .populate('teacherId', '-password -createdAt -updatedAt -__v')
//             .populate('students', '-role -password -createdAt -updatedAt -__v');

//         // Kiểm tra nếu giáo viên chưa có khóa học nào
//         if (!courses || courses.length === 0) {
//             return res.status(404).json({ message: `You don't have any course!` });
//         }

//         const formattedCourses = courses.map(course => ({
//             id: course._id,
//             title: course.title,
//             description: course.description,
//             teacher: {
//                 id: course.teacherId._id,
//                 name: course.teacherId.fullname,
//                 email: course.teacherId.email,
//                 role: course.teacherId.role
//             },
//             students: course.students.map(student => ({
//                 id: student._id,
//                 name: student.fullname,
//                 email: student.email
//             })),
//             total_students: course.students.length,
//             created_at: course.createdAt,
//         }));

//         res.status(200).json({
//             status: 'success',
//             message: 'Lists all of courses',
//             total_courses: courses.length,
//             courses: formattedCourses
//         })
//     } catch (error) {
//         next(error);
//     }
// }

// 2.1.2 List all courses by author (Teacher info appears only once)
exports.allCoursesByAuthor = async (req, res, next) => {
    try {
        const author = req.user.id;

        // Kiểm tra xem người dùng có tồn tại không
        const teacher = await User.findById(author).select('-password -createdAt -updatedAt -__v');
        if (!teacher) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Chỉ cho phép teacher hoặc admin xem danh sách khóa học
        if (!['teacher', 'admin'].includes(teacher.role)) {
            return res.status(403).json({ message: 'You have no right to create a course, so there is no course here' });
        }

        // Tìm tất cả các khóa học của giáo viên này
        const courses = await Course.find({ teacherId: author })
            .populate('students', '-role -password -createdAt -updatedAt -__v');

        // Kiểm tra nếu giáo viên chưa có khóa học nào
        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: `You don't have any courses!` });
        }

        const formattedCourses = courses.map(course => ({
            id: course._id,
            title: course.title,
            description: course.description,
            students: course.students.map(student => ({
                id: student._id,
                name: student.fullname,
                email: student.email
            })),
            total_students: course.students.length,
            created_at: course.createdAt,
        }));

        res.status(200).json({
            status: 'success',
            message: 'List of all courses by this teacher',
            total_courses: courses.length,
            teacher: {
                id: teacher._id,
                name: teacher.fullname,
                email: teacher.email,
                role: teacher.role
            },
            courses: formattedCourses
        });
    } catch (error) {
        next(error);
    }
};

//2.2 Update course (Only the person created course so they can update)
exports.updateCourse = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const teacherId = req.user.id;

        if (!title) {
            return res.status(400).json({ message: 'Title is required!' });
        }

        const user = await User.findById(teacherId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Chỉ cho phép teacher hoặc admin update khóa học
        if (!['teacher', 'admin'].includes(user.role)) {
            return res.status(403).json({ message: 'You have no right to update this course!' });
        }

        // Tìm khóa học theo ID từ params
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found!' });
        }

        // Kiểm tra xem giáo viên có phải là người tạo khóa học không
        if (course.teacherId.toString() !== teacherId) {
            return res.status(403).json({ message: 'You are not authorized to update this course!' });
        }

        // Admin hoặc giáo viên tạo khóa học có thể cập nhật
        // if (course.teacherId.toString() !== teacherId && req.user.role !== 'admin') {
        //     return res.status(403).json({ message: 'You are not allowed to update this course' });
        // }


        // Cập nhật khóa học
        course.title = title;
        if (description !== undefined) {
            course.description = description;
        }

        await course.save();

        res.status(200).json({
            status: 'message',
            message: 'Course update successfully!',
            course: {
                id: course._id,
                title: course.title,
                description: course.description,
                teacher: req.user.fullname,
                updated_at: course.updatedAt
            }
        });

    } catch (error) {
        error(next);
    }
}

//2.3 Delete course 
exports.deleteCourse = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;

        // Tìm khóa học theo ID
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Quyền xóa:
        // - Giáo viên chỉ xóa được khóa học của chính họ
        // - Admin có thể xóa tất cả khóa học, bao gồm khóa học của giáo viên khác
        if (userRole !== 'admin' && course.teacherId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not allowed to delete this course' });
        }

        // Xóa khóa học
        await course.deleteOne();
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        next(error);
    }
};


//4.1 Enroll course by student 
exports.enrollCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const studentId = req.user.id;

        // Find the course by courseId
        const course = await Course.findById(courseId);
        if (!course) {
            res.status(404).json({ message: 'Course not found!' });
        }

        // Kiểm tra xem sinh viên đã tham gia khóa học chưa
        if (course.students.includes(studentId)) {
            return res.status(400).json({ message: 'You have already enrolled in this course.' });
        }

        // Giao vien nao da tao khoa hoc nay thi khong duoc phep dang ky vao khoa hoc nua 
        if (course.teacherId.toString() === studentId) {
            return res.status(400).json({ message: 'You have created this course!' });
        }

        // Thêm sinh viên vào danh sách khóa học
        course.students.push(studentId);
        await course.save();


        res.status(200).json({
            status: 'success',
            message: 'Enrollment successful!',
            course: {
                id: course._id,
                title: course.title,
                students: course.students.length
            }
        });

    } catch (error) {
        next(error);
    }
}


//4.2 View list courses enrolled (student)
exports.getMyCourses = async (req, res, next) => {
    try {
        const studentId = req.user.id;

        // Tìm tất cả các khóa học mà sinh viên này đã tham gia
        const courses = await Course.find({ students: studentId })
            .populate('teacherId', 'fullname email')
            .select('title description createdAt teacherId');

        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: "You haven't enrolled in any courses yet." });
        }

        res.status(200).json({
            status: 'success',
            total_courses: courses.length,
            courses: courses.map(course => ({
                id: course._id,
                title: course.title,
                description: course.description,
                teacher: {
                    id: course.teacherId._id,
                    name: course.teacherId.fullname,
                    email: course.teacherId.email
                },
                enrolled_at: course.createdAt
            }))
        });

    } catch (error) {
        next(error);
    }
};

