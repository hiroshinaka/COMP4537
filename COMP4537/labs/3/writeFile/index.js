const http = require('http');
const url = require('url');
const writer = require('./utils.js');
const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    // Handle both /writeFile and /COMP4537/labs/3/writeFile paths
    if (pathname === '/writeFile' || pathname === '/COMP4537/labs/3/writeFile') {
        const text = parsedUrl.query.text;
        
        if (!text) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Error: Missing text parameter');
            return;
        }

        try {
            const filepath = writer.writeTexttoFile(text);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Successfully appended "${text}" to file.txt`);
        } catch (error) {
            console.error('Error writing to file:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error: Failed to write to file');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
}).listen(PORT, () => {
    console.log(`Write server running on port ${PORT}`);
    console.log(`Endpoint: http://localhost:${PORT}/writeFile?text=yourtext`);
});


