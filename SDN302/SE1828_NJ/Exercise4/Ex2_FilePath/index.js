var http = require('http');
const fs = require('fs');
const { readFile } = require('./file');
const path = require('path');
const hostname = "localhost";
const port = 9999;
http.createServer((req, res) => {
    //Send the HTTP header 
    console.log(req.headers);
    //Send the response body of file 
    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.urll;
        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            readFile(filePath)
                .then((data) => {
                    res.setHeader('Content-Type', 'text/html');
                    res.statusCode = 200;
                    console.log('File: ' + data);
                    res.end(data);
                })
                .catch((err) => {
                    console.error('Error reading file: ', err);
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                });
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + ' not supported</h1></body></html>')
    }

}).listen(port);

//Console will print the message 
console.log(`Server running at http://${hostname}:${port}/`);