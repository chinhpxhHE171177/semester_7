// app.js
const express = require('express');
const app = express();
const port = 3000;

// Import routers
const articleRouter = require('./routes/articleRouter');

// Use routers
app.use('/articles', articleRouter);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
