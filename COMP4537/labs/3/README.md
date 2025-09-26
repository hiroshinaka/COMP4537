# File Read/Write API

This is a Node.js API that provides endpoints for reading and writing files.

## Endpoints

### Write to File
- **URL**: `/writeFile?text=yourtext` or `/COMP4537/labs/3/writeFile?text=yourtext`
- **Method**: GET
- **Description**: Appends text to file.txt
- **Example**: `https://yourdomain.com/writeFile?text=BCIT`

### Read File
- **URL**: `/readFile/filename` or `/COMP4537/labs/3/readFile/filename`
- **Method**: GET
- **Description**: Reads and displays file content
- **Example**: `https://yourdomain.com/readFile/file.txt`

## Local Development

1. Install dependencies: `npm install`
2. Run server: `npm start`
3. Test endpoints:
   - Write: `http://localhost:3000/writeFile?text=test`
   - Read: `http://localhost:3000/readFile/file.txt`

## Deployment

This project is configured for deployment on Vercel, Railway, Render, or Heroku.
