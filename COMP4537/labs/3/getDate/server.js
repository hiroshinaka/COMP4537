const http = require('http');
const url = require('url');
const date = require('./module/utils.js');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });    
    const parsedUrl = url.parse(req.url, true);
    const name = parsedUrl.query.name || 'Bob';

    
    // Get current server time
  
    const response = `
        <div style="color: blue;">
            <p><span style="font-weight: bold;">Hello, ${name},</span>
            <br>
            <span>What a beautiful day. Server current date and time is </span>
            <br>
            <span style="font-weight: bold;">Current server time:</span> ${date.time()}</p>
        </div>
    `;
    
    res.end(response);
}).listen(3000);


