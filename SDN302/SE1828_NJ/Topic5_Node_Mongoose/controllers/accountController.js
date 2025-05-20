const Account = require('../models/account');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAccount = async (req, res, next) => {
    try {
        const { username, password, phone, address } = req.body;

        const newAccount = new Account({ username, password, phone, address });

        // Save into DB
        const result = await newAccount.save();

        res.status(201).json({
            name: result.username,
            phone: result.phone,
            address: result.address
        });
    } catch (error) {
        //res.status(500).json({ message: error.message });
        next(error);
    }
};


exports.signIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const existAccount = await Account.findOne({ username: username });

        if (!existAccount) {
            res.status(404).json({ message: `${username} not found!` });
        }

        const isMatch = await bcryptjs.compare(password, existAccount.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password!' });

        // tao access token bang jsonwebtoken
        const token = jwt.sign({ id: existAccount._id }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '7d' });
        res.status(200).json({
            message: 'Sign in successfully!',
            result: {
                id: existAccount._id,
                name: existAccount.username,
                access_token: token
            }
        });

    } catch (error) {
        next(error);
    }
}

exports.testAuth = async (req, res, next) => {
    try {
        res.status(200).json({ result: 'Hello' })
    } catch (error) {
        next(error);
    }
}