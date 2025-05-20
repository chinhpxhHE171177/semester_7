const express = require('express');
const Product = require('../models/products');
const Image = require('../models/images');
const Comment = require('../models/comments');
const User = require('../models/users');
const router = express.Router();

//2. Create comment and update comment in product
router.post('/', async (req, res, next) => {
    try {
        const { productId, title, body, userId } = req.body;

        if (!userId || !title || !body || !productId) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({ message: 'Product not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const newComment = new Comment({
            title,
            body,
            user: userId
        });
        await newComment.save();

        // Them comment vao product
        await Product.findByIdAndUpdate(productId, {
            $push: { comments: newComment._id }
        });

        res.status(201).json({
            newComment: {
                title: newComment.title,
                body: newComment.body,
                user: {
                    _id: user._id,
                    username: user.username
                },
                _id: newComment._id,
                createdAt: newComment.createdAt,
                updatedAt: newComment.updatedAt
            }
        });

    } catch (error) {
        next(error);
    }
});


module.exports = router;