const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const fs = require('fs').promises;
require('dotenv').config();

const validateInput = (username, password) => {
    if (!username || !password) throw new Error('Username and password are required');
    if (username.length < 3 || username.length > 50) throw new Error('Username must be between 3 and 50 characters');
    if (!/^[a-zA-Z0-9_]+$/.test(username)) throw new Error('Username can only contain letters, numbers, and underscores');
    if (password.length < 8) throw new Error('Password must be at least 8 characters long');
    if (password.length > 128) throw new Error('Password cannot exceed 128 characters');
    if (!/[A-Z]/.test(password)) throw new Error('Password must contain at least one uppercase letter');
    if (!/[a-z]/.test(password)) throw new Error('Password must contain at least one lowercase letter');
    if (!/[0-9]/.test(password)) throw new Error('Password must contain at least one number');
    if (!/[!@#$%^&*]/.test(password)) throw new Error('Password must contain at least one special character (!@#$%^&*)');
};

// View: Render Login Page
exports.getLogin = (req, res) => {
    res.render('login', { error: null });
};

// View: Handle Login
exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        validateInput(username, password);
        const user = await User.findOne({ username }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('login', { error: 'Invalid credentials' });
        }
        req.session.isAuthenticated = true;
        req.session.user = { id: user._id, username: user.username };
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        req.session.token = token;
        res.redirect('/dashboard');
    } catch (error) {
        res.render('login', { error: error.message });
    }
};

// View: Logout
exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
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
        return res.status(201).json({ message: 'User registered successfully!', user })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}