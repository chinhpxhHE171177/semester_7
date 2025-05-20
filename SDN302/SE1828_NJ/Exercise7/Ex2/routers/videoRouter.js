// videoRouter.js
const express = require('express');
const videoRouter = express.Router();

// Middleware to parse JSON and URL-encoded data
videoRouter.use(express.json());
videoRouter.use(express.urlencoded({ extended: true }));

// Route to get all videos
videoRouter.route('/')
    .get((req, res) => {
        res.status(200).send('Will send all the videos to you!');
    })
    // Route to post a new video
    .post((req, res) => {
        const { title, description, url } = req.body;
        res.status(201).json({
            message: `Video titled "${title}" with description "${description}" added. URL: ${url}`
        });
    })
    // PUT operation not supported on all videos
    .put((req, res) => {
        res.status(403).json({ message: 'PUT operation not supported on /videos' });
    })
    // Route to delete all videos
    .delete((req, res) => {
        res.status(200).json({ message: 'Deleting all videos' });
    });

// Route to handle specific video by ID
videoRouter.route('/:id')
    // Get a specific video
    .get((req, res) => {
        res.status(200).send(`Will send details of the video with ID: ${req.params.id} to you!`);
    })
    // POST not supported on specific video
    .post((req, res) => {
        res.status(403).send(`POST operation not supported on /videos/${req.params.id}`);
    })
    // Update a specific video
    .put((req, res) => {
        const { title, description, url } = req.body;
        res.status(200).send(`Updating the video with ID: ${req.params.id}. New title: "${title}", description: "${description}", URL: ${url}`);
    })
    // Delete a specific video
    .delete((req, res) => {
        res.status(200).send(`Deleting video with ID: ${req.params.id}`);
    });

module.exports = videoRouter;
