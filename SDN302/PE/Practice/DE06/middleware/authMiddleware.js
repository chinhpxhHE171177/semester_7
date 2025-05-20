const User = require('../models/users');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        // Lay token tu header cua req 
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) return res.status(401).json({ message: 'No token provied!' });

        // Giai ma token dua vao private key 
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        //Lay du lieu cua account can cu theo payload (id) tu decode 
        // --> gan cho object req
        req.user = await User.findById(decode.id).select('-password -__v');
        if (!req.user) return res.status(401).json({ message: 'Invalid token' });
        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid or Expired Token' });
    }
}

module.exports = authMiddleware;