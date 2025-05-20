// app.js 
var express = require('express');
// Import data from article.js
const articles = require('./articles');
const article = require('./articles');
const app = express();
const port = 3000;
//Process data here 
app.listen(port, () => {
    console.log(`Example app listening at http://locahost:${port}`);
});

// GET all articles 
app.get('/articles', (req, res) => {
    try {
        res.status(200).json(articles);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
});

//GET a specific article 
app.get('/articles/:id', async (req, res) => {
    try {
        //GET Id from URL
        const id = parseInt(req.params.id);
        // Find articles with ID
        const article = articles.find(article => article.id === id);

        //If the post is not found, 404 is returned 
        if (!article) {
            return res.status(404).send('Article not found');
        }
        // If found, returns the article 
        res.status(200).json(article);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// For parsing application/json 
app.use(express.json());
// For parsing application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }));

// POST a new article
app.post('/articles', async (req, res) => {
    // Create a new post from the data in req.body 
    const newArticle = {
        id: articles.length + 1, // This is simply an example 
        //and is not safe in a production enviroment 
        title: req.body.title,
        date: req.body.date,
        text: req.body.text
    };
    articles.push(newArticle);
    res.status(201).json(newArticle);
});

// PUT a new article 
app.put('/articles/:id', (req, res) => {
    // Find the article's index in the array 
    const index = articles.findIndex(article => article.id === parseInt(req.params.id));
    if (index === - 1) return res.status(404).send('Article not found!');

    //Updated article with new data from req.body 
    articles[index] = {
        ...articles[index],
        ...req.body
    };
    res.json(articles[index]);
});

// DELETE a post 
app.delete('/articles/:id', (req, res) => {
    const index = articles.findIndex(article => article.id === parseInt(req.params.id));
    if (index === - 1) return res.status(404).send('Article not found!');

    //Remove posts from the array
    const deleteArticle = articles.splice(index, 1);
    res.status(204).json(deleteArticle);

});

module.exports = app;