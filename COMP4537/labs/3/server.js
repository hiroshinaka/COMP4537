const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });    
    const parsedUrl = url.parse(req.url, true);
    const name = parsedUrl.query.name || 'Bob';

    
    // Get current server time
    const currentTime = new Date().toLocaleString();
  
    const response = `
        <div style="color: blue;">
            <h2>Hello, ${name}!</h2>
            <p>Welcome to my API server.</p>
            <p>Current server time: ${currentTime}</p>
        </div>
    `;
    
    res.end(response);
}).listen(3000);


