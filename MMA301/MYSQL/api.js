const express = require('express');
const mysql = require('mysql2');
const app = express();
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "mytable"
});
conn.connect(err => err);
app.get('/data', (req, res) => {
    conn.query('SELECT * FROM mytable', (err, results) => {
        if (err) {
            throw err;
        } else {
            res.json({ products: results });
        }
    });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});