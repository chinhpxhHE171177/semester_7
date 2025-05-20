// server.js 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

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


app.use('/users', require('./routes/auth.routes'));
app.use('/courses', require('./routes/course.routes'));
// app.use('/lessons', require('./routes/lesson.routes'));

//Middleware 
app.use((err, req, res, next) => {
    // const statusCode = err.status || 500; 
    // res.status(statusCode).json({
    //     status: statusCode,
    //     message: err.message || "Internal Server Error"
    // });
    const statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";
    let details = null;

    // Nếu lỗi là Mongoose ValidationError
    if (err.name === "ValidationError") {
        message = Object.values(err.errors).map(error => error.message).join(", "); // Chỉ lấy nội dung lỗi
    }
    res.status(statusCode).json({
        status: statusCode,
        message: message
    });
});

app.listen(process.env.PORT || 9999, () => {
    console.log(`Server running on ${process.env.PORT || 9999}`);
    connectDB();
});

