// middlewares/authMiddleware.js
const { verifyToken } = require('../utils/jwt');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    //console.log('Authorization Header:', authHeader); // Debug

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    const token = authHeader.split(' ')[1];
    //console.log('Token:', token); // Debug

    try {
        const decoded = verifyToken(token);
        //console.log('Decoded Token:', decoded); // Debug
        req.user = decoded; // Lưu thông tin khách hàng từ token vào req.user
        next();
    } catch (error) {
        console.log('Token Error:', error.message); // Debug
        return res.status(401).json({ message: error.message });
    }
};

module.exports = authMiddleware;