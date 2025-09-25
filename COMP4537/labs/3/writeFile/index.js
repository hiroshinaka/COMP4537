const http = require('http');
const url = require('url');
const writer = require('./utils.js');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });    
    const parsedUrl = url.parse(req.url, true);
    const text = parsedUrl.query.text || ' ';

    const filepath = writer.writeTexttoFile(text);
    res.end(`Saved to ${filepath}`);
  
}).listen(3000);


