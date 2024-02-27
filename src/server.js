const http = require('http');
const readFile = require('fs').readFile;
const createServer = require('http').createServer;

const PORT = process.env.PORT || 3000; // You can change the port number if needed

const server = createServer((req, res) => {
  console.log('req.url:', req.url);
  let filePath = './src' + req.url;
  console.log('filePath:', filePath);
  if (filePath === './src/') {
    filePath = './src/index.html';
  }
  console.log('filePath:', filePath);

  const extname = String(filePath.split('.').pop(-1));

  console.log('extname:', extname);

  const contentType = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon'
  }[extname] || 'application/octet-stream';

  console.log('contentType:', contentType);

  readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('404 Not Found');
        console.log('err:', err.toString());
      } else {
        res.writeHead(500);
        res.end('500 Internal Server Error');
        console.log('err:', err.toString());
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
      //console.log('content:', content.toString());
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
