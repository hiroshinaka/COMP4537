const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

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
    
    // Handle both /readFile/filename and /COMP4537/labs/3/readFile/filename paths
    if (pathname.startsWith('/readFile/') || pathname.startsWith('/COMP4537/labs/3/readFile/')) {
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

        try {
            const filepath = path.join(__dirname, filename);
            
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
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
}).listen(PORT, () => {
    console.log(`Read server running on port ${PORT}`);
    console.log(`Endpoint: http://localhost:${PORT}/readFile/filename`);
});
