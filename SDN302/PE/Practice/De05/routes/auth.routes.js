const express = require('express');
const User = require('../models/users');
const Course = require('../models/courses');
const Enroll = require('../models/enrollments');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//1. Register a user 
router.post('/register', async (req, res, next) => {
    try {
        const { fullname, username, email, password, phone, dateOfBirth, gender, address, personalInfo } = req.body;

        //check validation
        const userE = await User.findOne({ email });

        if (userE) {
            return res.status(401).json({ message: 'Email existed!' });
        }

        const userN = await User.findOne({ username });

        if (userN) {
            return res.status(401).json({ message: 'User name existed!' });
        }

        const newUser = new User({
            fullname,
            username,
            email,
            password,
            phone,
            dateOfBirth,
            gender,
            address,
            personalInfo
        });

        const result = await newUser.save();

        res.status(201).json({
            message: 'Registered successfully!',
            user: {
                fullname: result.fullname,
                username: result.username,
                email: result.email,
                phone: result.phone,
                dateOfBirth: result.dateOfBirth,
                gender: result.dateOfBirth,
                address: result.address,
                role: result.role,
                personalInfo: {
                    bio: result.personalInfo.bio,
                    profileImage: result.personalInfo.profileImage,
                    socialLinks: result.personalInfo.socialLinks
                },
                enrolledCourses: result.enrolledCourses
            }
        });

    } catch (error) {
        next(error);
    }
});

//1.1 Login a user 
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra nếu thiếu thông tin
        if (!email || !password) {
            return res.status(400).json({ message: `Please fill all fields` });
        }

        // Tìm người dùng theo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: `Email ${email} not existed!` });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password!' });
        }

        // Tạo access token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { algorithm: 'HS256', expiresIn: '7d' }
        );

        res.status(200).json({
            accessToken: token,
            user: {
                id: user._id,
                name: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0'); // Lấy ngày, thêm '0' nếu nhỏ hơn 10
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng (tính từ 0 nên +1)
    const year = d.getFullYear(); // Lấy năm
    return `${year}-${month}-${day}`; // Trả về chuỗi định dạng dd/MM/yyyy
};

//5. Lay thong tin hoc vien kem lich su dang ky khoa hoc 
router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found'
            })
        }

        const enrollments = await Enroll.find({ student: userId })
            .populate('course', '_id title');

        if (!enrollments) {
            return res.status(404).json({
                status: false,
                message: 'You have not enroll the course!'
            })
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            profile: {
                fullname: user.fullname,
                dateOfBirth: formatDate(user.dateOfBirth),
                phone: user.phone,
                address: user.address
            },
            enrollments: enrollments.map(enroll => ({
                course: {
                    _id: enroll.course._id,
                    title: enroll.course.title
                },
                status: enroll.status,
                enrollmentDate: enroll.enrolledAt
            }))
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;