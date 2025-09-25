const fs = require('fs');
const path = require('path');

exports.writeTexttoFile = function (text){
    const filepath = path.join(__dirname, '..', 'readFile', 'file.txt');
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.appendFileSync(filepath, text + '\n', 'utf8');
    return filepath;
}