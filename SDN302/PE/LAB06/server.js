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

app.use('/products', require('./routes/products.routes'));
app.use('/comments', require('./routes/comments.routes'));
app.use('/cart', require('./routes/carts.routes'));
app.use('/users', require('./routes/users.routes'));

// Middleware 
// app.use((err, req, res, next) => {
//     if (err) {
//         res.status(err.status).json({
//             status: err.status,
//             message: err.message
//         });
//     }
// });

//Middleware 
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        status: statusCode,
        message: err.message || "Internal Server Error"
    });
});

app.listen(process.env.PORT || 9999, () => {
    console.log(`Server running on ${process.env.PORT || 9999}`);
    connectDB();
});