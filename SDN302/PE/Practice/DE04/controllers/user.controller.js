const User = require('../models/users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//1. Register a new user 
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ message: 'User already exists' });
        }

        const newUser = new User({
            name,
            email,
            password,
            role
        });

        await newUser.save();
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            newUser
        });
    } catch (error) {
        next(error);
    }
}

//2. Login a user 
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Kiem tra co thieu cac truong nao khong 
        if (!email || !password) {
            return res.status(404).json({ message: 'Please fill in all fields' });
        }

        // Kiem tra user co ton tai
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // So sanh mat khau 
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Tao token 
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { algorithm: 'HS256', expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Sign in successfully!',
            result: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                walletBalance: user.walletBalance,
                created_at: user.createdAt,
            },
            acess_token: token
        });

    } catch (error) {
        next(error);
    }
}