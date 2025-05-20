// app.js
const express = require('express');
const app = express();
const port = 3000;

// Import routers
const videoRouter = require('./routers/videoRouter');

// Use routers
app.use('/videos', videoRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
