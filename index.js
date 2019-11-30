const http = require('http')
const path = require('path')
const fs = require('fs')

const appDir = 'src'

// This will setup a very, very simple web server. 

const server = http.createServer((req, res) => {
    // Build file path
    let filePath = path.join(__dirname, appDir, req.url === '/' ? 'index.html' : req.url)

    // Extension of file
    let extname = path.extname(filePath)

    // Initial content type
    let contentType = 'text/html'

    // Check ext and set content type - could be refactored to use a library
    switch(extname) {
        case '.js':
        case '.mjs':
            contentType = 'text/javascript'
            break;
        case '.css':
            contentType = 'text/css'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.jpg':
            contentType = 'image/jpg'
            break;
    }

    // Read File
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, appDir, '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html'})
                    res.end(content, 'utf8')
                })
            } else {
                // Some server error
                res.writeHead(500)
                res.end(`Server Error: ${err.code}`)
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType})
            res.end(content, 'utf8')
        }
    })
})

const PORT = process.env.PORT || 5000

// starts server
server.listen(PORT, () => console.log(`server running on port ${PORT}`))
