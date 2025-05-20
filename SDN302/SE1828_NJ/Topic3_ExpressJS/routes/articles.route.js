const express = require('express');
const { ArticleController } = require('../controllers');
const articleRouter = express.Router();

// Create a middleware to determine the request time 
// from the client call to the route
const timeLog = (req, res, next) => {
    console.log("Time:" + Date.now());
    next();
}

articleRouter.use(timeLog);
articleRouter.use(express.json());
articleRouter.use(express.urlencoded({ extended: true }));

// Execute a middleware to function CRUD
// GET :/list -> GET All List of Articles 
articleRouter.get("/list", ArticleController.getArticles);

// Define about the get by Id
// GET: /:id -> GET a specific article 
articleRouter.get("/:id", ArticleController.getArticle);

// POST, PUT,....

module.exports = articleRouter;