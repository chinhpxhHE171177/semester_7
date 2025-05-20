// utils/jwt.js
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Lưu trong .env

// Ký token
const signToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token hết hạn sau 1 giờ
};

// Xác minh token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = { signToken, verifyToken };