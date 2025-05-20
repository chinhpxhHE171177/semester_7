const express = require('express');
const articleRouter = express.Router();

articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));


articleRouter.post("/", async (req, res, next) => {
    try {
        const { title, date, text } = req.body;

        // Simulate article saving logic 
        if (!title || !text || !date) {
            throw new Error('Missing required article fields');
        }

        // If the operation was successful, send a success response 
        res.status(201).json({
            message: "Article saved successfully!"
        });
    } catch (err) {
        // Pass the error to the error-handling middlewares 
        next(err);
    }
});


articleRouter.delete("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        // Simulate article deletion logic 
        if (isNaN(id)) {
            throw new Error('Invalid article ID');
        }

        // If the operation was successfull, send a success response
        res.status(200).json(`Deleting article: ` + id);
    } catch (err) {
        // Pass the error to the error-handling middlewares
        next(err);
    }
});

module.exports = articleRouter;