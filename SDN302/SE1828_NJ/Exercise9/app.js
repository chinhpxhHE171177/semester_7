const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const articleRoutes = require('./routes/articleRoutes');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to log requests 
app.use(morgan('dev'));

// const validateArticle = async (req, res, next) => {
//     try {
//         const { title, date, text } = req.body;

//         //Check if title, date, and text are present 
//         if (!title || !date || !text) {
//             return res.status(400).json({ error: 'Missing required fields' });
//         }

//         // Additional validation logic can be added here 
//         next();
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Error validating article');
//     }
// };


// const validateArticle = async (req, res, next) => {
//     try {
//         const { title, date, text } = req.body;

//         // Check if title, date, and text are present 
//         if (!title || !date || !text) {
//             return res.status(400).json({ error: 'Missing required fields' });
//         }

//         // Validate date format (DD/MM/YYYY)
//         const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
//         if (!dateRegex.test(date)) {
//             return res.status(400).json({ error: 'Invalid date format. Use DD-MM-YYYY' });
//         }

//         // Check if date is a valid date
//         const parsedDate = new Date(date);
//         if (isNaN(parsedDate.getTime())) {
//             return res.status(400).json({ error: 'Invalid date value' });
//         }

//          // Validate text length (Minimum 10, Maximum 500 characters)
//          if (text.length < 10 || text.length > 500) {
//             return res.status(400).json({ error: 'Text must be between 10 and 500 characters' });
//         }

//         next();
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Error validating article');
//     }
// };


// //POST a new article 
// app.post('/articles', validateArticle, async (req, res) => {
//     try {
//         res.status(201).end('Will add the article: ' + req.body.title + ' with details: ' + req.body.text + ' and: ' + req.body.date);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });


app.use('/articles', articleRoutes);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});