const express = require('express');
const Customer = require('../models/customers');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//Q5.
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra nếu thiếu thông tin
        if (!email || !password) {
            return res.status(400).json({ message: `Please fill all fields` });
        }

        // Tìm người dùng theo email
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(401).json({ message: `Email ${email} not existed!` });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcryptjs.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password!' });
        }

        // Tạo access token
        const token = jwt.sign(
            { id: customer._id },
            process.env.JWT_SECRET,
            { algorithm: 'HS256', expiresIn: '1h' }
        );

        res.status(200).json({
            token: token
        });
    } catch (error) {
        next(error);
    }
});

router.get('/profile', authMiddleware, async (req, res, next) => {
    try {
        const customerId = req.customer.id;

        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({
            _id: customer._id,
            name: customer.name,
            email: customer.name,
            address: customer.address,
            phone: customer.phone
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;