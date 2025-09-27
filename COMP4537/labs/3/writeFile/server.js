const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const BASE = '/COMP4537/labs/3';
const FILEPATH = path.join(__dirname, '..', 'readFile', 'file.txt');


function checkDir(p){
    fs.mkdirSync(path.dirname(p), {recursive: true});
}

const server = http.createServer((req, res) => {
    const {pathname, query} = url.parse(req.url, true);

    if (pathname === `${BASE}/writeFile/`){
        const raw = (query.text ?? '').toString();
        checkDir(FILEPATH);
        fs.appendFileSync(FILEPATH, raw + '\n', 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Saved to ${FILEPATH}`);
        return;
    }

    if (pathname === `${BASE}/readFile/file.txt`){
        if (!fs.existsSync(FILEPATH)){
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }
        const body = fs.readFileSync(FILEPATH, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(body);
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
}).listen(3000);

