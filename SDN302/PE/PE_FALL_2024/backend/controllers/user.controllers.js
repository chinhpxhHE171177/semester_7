// controllers/user.controllers.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

// Input validation function
const validateInput = (username, password) => {
    if (!username || !password) {
        throw new Error('Username and password are required');
    }
    if (username.length < 3 || username.length > 50) {
        throw new Error('Username must be between 3 and 50 characters');
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        throw new Error('Username can only contain letters, numbers, and underscores');
    }

    // Password validation
    if (password.length < 8) {  // Tăng lên 8 để bảo mật hơn
        throw new Error('Password must be at least 8 characters long');
    }
    if (password.length > 128) {
        throw new Error('Password cannot exceed 128 characters');
    }
    if (!/[A-Z]/.test(password)) {
        throw new Error('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        throw new Error('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
        throw new Error('Password must contain at least one number');
    }
    if (!/[!@#$%^&*]/.test(password)) {
        throw new Error('Password must contain at least one special character (!@#$%^&*)');
    }
};

// Register user
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        validateInput(username, password);

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            username,
            password: hashedPassword
        });

        // Return success response
        // return res.status(201).json({
        //     message: 'User registered successfully!',
        //     user: {
        //         id: user._id,
        //         username: user.username,
        //         createdAt: user.createdAt
        //     }
        // });

        return res.status(201).json({ message: 'User registered successfully!', user })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Login user 
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        validateInput(username, password);

        // Find user
        const user = await User.findOne({ username }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return success response
        res.json({
            message: 'Login successful',
            token,
            // user: {
            //     id: user._id,
            //     username: user.username
            // }
        });

        // res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}