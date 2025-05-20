const express = require('express');
const Product = require('../models/products');
const Image = require('../models/images');
const Comment = require('../models/comments');
const User = require('../models/users');
const Cart = require('../models/carts');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

//4.Register
router.post('/', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        //check validation
        const user = await User.findOne({ email });

        if (user) {
            res.status(401).json({ message: 'Email existed!' });
        }

        const newUser = new User({ username, email, password });

        const result = await newUser.save();

        res.status(201).json({
            message: 'Create successfully!',
            data: {
                username: result.username,
                password: 'Not Show',
                email: result.email,
                _id: result._id,
                __v: result.__v
            }
        });

    } catch (error) {
        next(error);
    }
});


//5. Login
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
            id: user._id,
            name: user.username,
            email: user.email,
            accessToken: token
        });

    } catch (error) {
        next(error);
    }
});


module.exports = router;