const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // Enable CORS for all requests
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

    // Route for writing to file
    if (pathname === '/writeFile' || pathname === '/COMP4537/labs/3/writeFile') {
        handleWriteFile(req, res, parsedUrl);
    }
    // Route for reading file
    else if (pathname.startsWith('/readFile/') || pathname.startsWith('/COMP4537/labs/3/readFile/')) {
        handleReadFile(req, res, pathname);
    }
    // Default route
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

function handleWriteFile(req, res, parsedUrl) {
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
        return;
    }

    const text = parsedUrl.query.text;
    
    if (!text) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Error: Missing text parameter');
        return;
    }

    try {
        const filepath = path.join(__dirname, 'readFile', 'file.txt');
        
        // Ensure directory exists
        fs.mkdirSync(path.dirname(filepath), { recursive: true });
        
        // Append text to file
        fs.appendFileSync(filepath, text + '\n', 'utf8');
        
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Successfully appended "${text}" to file.txt`);
    } catch (error) {
        console.error('Error writing to file:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error: Failed to write to file');
    }
}

function handleReadFile(req, res, pathname) {
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
        return;
    }

    try {
        // Extract filename from path
        let filename;
        if (pathname.startsWith('/readFile/')) {
            filename = pathname.replace('/readFile/', '');
        } else if (pathname.startsWith('/COMP4537/labs/3/readFile/')) {
            filename = pathname.replace('/COMP4537/labs/3/readFile/', '');
        }

        if (!filename) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Error: No filename provided');
            return;
        }

        const filepath = path.join(__dirname, 'readFile', filename);
        
        // Check if file exists
        if (!fs.existsSync(filepath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`404 Error: File "${filename}" not found`);
            return;
        }

        // Read and return file content
        const content = fs.readFileSync(filepath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(content);
        
    } catch (error) {
        console.error('Error reading file:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error: Failed to read file');
    }
}

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Write endpoint: http://localhost:${PORT}/writeFile?text=yourtext`);
    console.log(`Read endpoint: http://localhost:${PORT}/readFile/file.txt`);
});

module.exports = server;
