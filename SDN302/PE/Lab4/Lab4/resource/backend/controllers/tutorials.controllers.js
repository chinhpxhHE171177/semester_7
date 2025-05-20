const Tutorial = require("../models/tutorials");
const Comment = require('../models/comments');
const Category = require("../models/categories");
const Image = require("../models/images");


// Get Tutorials
// 1.1
exports.getAllTutorials = async (req, res) => {
    try {
        const tutorials = await Tutorial.find()
            .populate('category', '-_id -__v')
            .populate('comments', '-__v')
        if (tutorials.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No data'
            });
        };
        return res.status(200).json(tutorials);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//1.2 
exports.getCommentByTutorialId = async (req, res, next) => {
    try {
        const tutorialId = req.params.id;

        const tutorial = await Tutorial.findById(tutorialId)
            .populate('comments', '-__v')

        if (!tutorial) {
            return res.status(400).json({
                success: false,
                message: 'No data'
            });
        }

        return res.status(200).json(tutorial.comments);
    } catch (error) {
        next(error);
    }
}

//1.3
exports.createComment = async (req, res, next) => {
    try {
        const tutorialId = req.params.id;
        const { username, text } = req.body;

        const newComment = new Comment({
            username,
            text
        });

        await newComment.save();

        const tutorial = await Tutorial.findById(tutorialId);
        tutorial.comments.push(newComment._id);
        await tutorial.save();

        return res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
}