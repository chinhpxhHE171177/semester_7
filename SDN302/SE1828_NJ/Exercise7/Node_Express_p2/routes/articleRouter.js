// articleRouter.js
const express = require('express');
const articleRouter = express.Router();

articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));

articleRouter.route('/')
    // GET all articles
    .get(async (req, res) => {
        try {
            res.status(200).send('Will send all the articles to you!');
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })
    // POST a new article 
    .post(async (req, res) => {
        try {
            res.status(201).json({
                message: `Will add the article: ${req.body.title} with details: ${req.body.text} and ${req.body.date}`
            });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })
    // PUT is not supported on all articles
    .put(async (req, res) => {
        try {
            res.status(403).json({ message: 'PUT operation not supported on /articles' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })
    // DELETE all articles
    .delete(async (req, res) => {
        try {
            res.status(200).json({ message: 'Deleting all articles' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

articleRouter.route('/:id')
    // GET a specific article 
    .get(async (req, res) => {
        try {
            res.status(200).send(`Will send details of the article: ${req.params.id} to you!`);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })
    // POST not supported on specific article
    .post(async (req, res) => {
        try {
            res.status(403).send(`POST operation not supported on /articles/${req.params.id}`);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })
    // PUT to update a specific article
    .put(async (req, res) => {
        try {
            res.status(200).send(`Updating the article: ${req.params.id}\nWill update the article: ${req.body.title} with details: ${req.body.text} and ${req.body.date}`);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })
    // DELETE a specific article
    .delete(async (req, res) => {
        try {
            res.status(200).send(`Deleting article: ${req.params.id}`);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

module.exports = articleRouter;
