// npm install -g express || npm i express
// npm i morgan nodemon
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { ArticlesRouter } = require('./routes');
const app = express();
const port = 9999;

// Declare use middleware 'morgan' -> Follow requests to send it 
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Control aunthentication access from many apps clients 
// all (*)
//app.use(cors());

// 
app.use(cors({
    origin: "http://localhost:3000; http://localhost:3001",
    method: ["GET", "POST", "PUT", "DELETE"],
    alowedHeaders: ["Content-Type", "Authorization"]
}));

// Root router 
app.get('/', (req, res) => {
    // res.send("Welcome to ExpressJS Web server");
    res.status(200).json({ "message": "Welcome to ExpressJS Web server" });
});

app.use('/articles', ArticlesRouter);

// New router 
// app.get('/articles', (req, res) => {
//     res.send("List all articles");
// });

// app.get('/articles/new', (req, res) => {
//     res.send("Shows new form for new article entry");
// });

// app.post('/articles', (req, res) => {
//     res.send("Creates a new blog post");
// });

// app.get('/articles/:ID', (req, res) => {
//     res.send("Shows the articles post with the given id: " + req.params.ID)
// });

// app.get('/articles/:ID/edit', (req, res) => {
//     res.send("Edit the blog post with the given id: " + req.params.ID);
// });

// app.put('/articles/:id', (req, res) => {
//     res.send("Update the article post with the given id: " + req.params.id);
// });

// app.delete('/articles/:id', (req, res) => {
//     res.status(200).send("Delete the blog post with the given id: " + req.params.id);
// });

//Change the 404 page 
app.use((req, res, next) => {
    res.status(404)
        .send("Error 404: Page not found");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});