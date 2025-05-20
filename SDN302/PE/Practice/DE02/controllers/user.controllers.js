const User = require('../models/users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//1.1 Register account 
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //check validation
        const user = await User.findOne({ email });

        if (user) {
            res.status(401).json({ message: 'Email existed!' });
        }

        const newAccount = new User({ name, email, password });
        const result = await newAccount.save();

        res.status(201).json({
            message: 'User registered successfully',
            userId: result._id
        });
    } catch (error) {
        next(error);
    }
}


//1.2 Login (return jwt token)
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
        next(error);
    }
}