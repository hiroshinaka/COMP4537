const http = require('http');
const url = require('url');
const date = require('./module/utils.js');
const { getGreetingHTML } = require('./lang/en/en.js');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });    
    const parsedUrl = url.parse(req.url, true);
    const name = parsedUrl.query.name || 'Bob';

    // Get current server time
    const currentTime = date.time();
    
    // Use HTML string from en.js
    const response = getGreetingHTML(name, currentTime);
    
    res.end(response);
}).listen(3000);


