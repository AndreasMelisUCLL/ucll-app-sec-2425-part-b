const { createServer: createHttpsServer } = require('https');
const { createServer: createHttpServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Check if certificates exist
const httpsOptions = (() => {
  try {
    return {
      key: fs.readFileSync(path.join(__dirname, 'certificates', 'selfsigned.key')),
      cert: fs.readFileSync(path.join(__dirname, 'certificates', 'selfsigned.crt')),
    };
  } catch (error) {
    console.warn('Failed to load HTTPS certificates, falling back to HTTP', error);
    return null;
  }
})();

app.prepare().then(() => {
  // Create HTTP server that only handles redirection
  createHttpServer((req, res) => {
    // Get the host without the port
    const hostParts = (req.headers.host || 'localhost:8080').split(':');
    const hostname = hostParts[0];
    
    // Construct the HTTPS URL with the correct port
    const httpsUrl = `https://${hostname}:8081${req.url}`;
    
    // Perform the redirect
    res.writeHead(301, { 
      'Location': httpsUrl,
      'Cache-Control': 'no-cache' // Prevent caching of the redirect
    });
    res.end();
  }).listen(8080, (err) => {
    if (err) throw err;
    console.log('> HTTP server running on http://localhost:8080 (redirecting to HTTPS)');
  });

  // Create HTTPS server if certificates are available
  if (httpsOptions) {
    createHttpsServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url || '', true);
      handle(req, res, parsedUrl);
    }).listen(8081, (err) => {
      if (err) throw err;
      console.log('> HTTPS server running on https://localhost:8081');
    });
  } else {
    console.error('No HTTPS certificates available. Only HTTP redirect server is running.');
  }
});