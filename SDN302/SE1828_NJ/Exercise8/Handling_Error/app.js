// app.js
const express = require('express');
const articleRouter = require('./routes/articleRouter');
const videoRouter = require('./routes/videoRouter');
const app = express();
const port = 3000;

// Middleware to parse JSON body 
app.use(express.json());
// Simulated article saving operation 
app.use('/articles', articleRouter);
app.use('/videos', videoRouter);

//Deleting an article 

// Middleware to handle errors 
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging 

    // Send a generic error response 
    res.status(500).json({
        error: "An error occurred, please try again later."
    });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));