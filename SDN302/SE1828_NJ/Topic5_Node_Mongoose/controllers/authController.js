// controllers/customerController.js
const Customer = require('../models/customer');
const bcrypt = require('bcryptjs');
const { signToken } = require('../utils/jwt'); // Sử dụng signToken từ utils/jwt.js

// Đăng ký tài khoản
exports.register = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        const existingUser = await Customer.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email đã tồn tại!' });

        const newUser = new Customer({ name, email, password, phone, address });
        await newUser.save();

        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Đăng nhập
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Customer.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Email không tồn tại!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Mật khẩu không đúng!' });

        // Tạo JWT Token bằng signToken từ utils/jwt.js
        const token = signToken({ userId: user._id.toString(), email: user.email });

        res.status(200).json({ message: 'Đăng nhập thành công!', access_token: token });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

module.exports = { register: exports.register, login: exports.login };