// controlers/user.controllers.js
const User = require('../models/users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//1. Dang ky
exports.register = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body;

        //check validation
        const user = await User.findOne({ email });

        if (user) {
            res.status(401).json({ message: 'Email existed!' });
        }

        const newUser = new User({ fullname, email, password });

        const result = await newUser.save();

        res.status(201).json({
            message: 'Registered successfully!',
            result: {
                fullname: result.fullname,
                email: result.email,
                role: result.role
            }
        });

    } catch (error) {
        next(error);
    }
}

//2. Dang nhap
exports.login = async (req, res, next) => {
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
            message: 'Sign in successfully!',
            result: {
                id: user._id,
                name: user.fullname,
                role: user.role,
                access_token: token
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}