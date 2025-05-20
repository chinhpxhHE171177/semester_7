var http = require('http');
const fs = require('fs');
const { readFile } = require('./file');
const hostname = "localhost";
const port = 9999;
http.createServer((req, res) => {
    //Send the HTTP header 
    console.log(req.headers);
    //Send the response body of file 
    const filename = 'index.html';
    readFile(filename)
        .then((data) => {
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            //response.end(data)
            fs.createReadStream(filename).pipe(res);
        })
        .catch((err) => {
            console.error(`Error reading file:`, err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });
}).listen(port);

//Console will print the message 
console.log(`Server running at http://${hostname}:${port}/`);