const http = require("http");

// Declare configuration for the web server
const hostname = "localhost";
let port = 9999; // Default port set to 9999

// Create a web server
const server = http.createServer((req, res) => {
    // Set response information (Status line)
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    // Read info from package file of client
    const reqHeader = req.headers;

    // Set content for the response object
    res.end(JSON.stringify(reqHeader));
});

// Listen for requests from client to server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

// Handle errors like EADDRINUSE
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Trying a different port...`);

        // Retry with an available port
        server.listen(0, hostname, () => {
            port = server.address().port; // Dynamically fetch assigned port
            console.log(`Server running at http://${hostname}:${port}`);
        });
    } else {
        console.error(`Server error: ${err.message}`);
    }
});
