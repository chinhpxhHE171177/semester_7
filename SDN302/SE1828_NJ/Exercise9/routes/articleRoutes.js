// articleRoutes.js
const express = require('express');
const validateArticle = require('../middlewares/validateArticle');
const validateTextLength = require('../middlewares/validateTextLength');

const router = express.Router();

router.post('/', validateArticle, validateTextLength, async (req, res) => {
    try {
        res.status(201).send(`Will add the article: ${req.body.title} with details: ${req.body.text} and: ${req.body.date}`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
