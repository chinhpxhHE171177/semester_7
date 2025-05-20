const express = require('express');
const mysql = require('mysql2');
const app = express();
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "petapp"
});
conn.connect(err => err);
app.get('/doctors', (req, res) => {
    conn.query('SELECT * FROM doctors', (err, results) => {
        if (err) {
            throw err;
        } else {
            res.json({ products: results });
        }
    });
});
app.listen(3000, () => {
    console.log('Server PET API is running on port 3000');
});