// videoRouter.js
const express = require('express');
const videoRouter = express.Router();

videoRouter.use(express.json());
videoRouter.use(express.urlencoded({ extended: true }));

videoRouter.post("/", async (req, res, next) => {
    try {
        const { name, price, text, date } = req.body;

        // Simulate article saving logic 
        if (!name || !price || !text || !date) {
            throw new Error('Missing required video fields');
        }

        // If the operation was successful, send a success response 
        res.status(201).json("Video saved successfully!");
    } catch (err) {
        // Pass the error to the error-handling middlewares 
        next(err);
    }
});


videoRouter.delete("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        // Simulate article deletion logic 
        if (isNaN(id)) {
            throw new Error('Invalid video ID');
        }

        // If the operation was successfull, send a success response
        // Set the Content-Type header to text/plain
        res.set('Content-Type', 'text/plain');
        res.status(200).send(`Deleting video: ${id}`);
    } catch (err) {
        // Pass the error to the error-handling middlewares
        next(err);
    }
});

module.exports = videoRouter;