// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const cors = require("cors")
// dotenv.config();
// const app = express();
// const apiRouter = require("./src/routers/api.router");
// app.use(express.json());
// app.use(cors());
// app.use(apiRouter);
// mongoose.connect(process.env.DB_URL).then(() => {
//     console.log("Connect successfully");   
// }).catch(() => {
//     console.log("Connect failed");
// });

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port http://localhost:${process.env.PORT}`);
// });


// server.js 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
require('dotenv').config();

const app = express();
//const apiRouter = require("./src/routers/api.router");

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get('/', async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Welcome to RESTFul API app' });
    } catch (error) {
        next(error);
    }
});

app.use('/tutorials', require("./src/routers/api.router"));

// Middleware 
app.use((err, req, res, next) => {
    if (err) {
        res.status(err.status).json({
            status: err.status,
            message: err.message
        });
    }
});


app.listen(process.env.PORT || 9999, () => {
    console.log(`Server running on ${process.env.PORT || 9999}`);
    connectDB();
});

