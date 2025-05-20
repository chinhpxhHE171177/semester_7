const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware for read data JSON

// ROUTE GET: To get data from file data.json
app.get('/data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading data file' });
        }
        res.json(JSON.parse(data));
    });
});

// ROUT POST: Update data in file data.json
app.post('/update', (req, res) => {
    const newData = req.body; // Get new data from request body

    fs.writeFile('data.json', JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error writting to data file' });
        }
        res.json({ message: 'Data updated successfully!', newData });
    });
});

// Start server 
app.listen(port, () => {
    console.log(`Server running at on http://localhost:${port}`);
});