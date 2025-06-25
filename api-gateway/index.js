// // index.js
// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const limiter = require('./rate-limit/limiter');
// require('dotenv').config();

// const app = express();
// const port = 5000;
// app.use(express.json());

// // Proxy rules
// app.use('/auth', limiter, createProxyMiddleware({ target: process.env.AUTH_URL, changeOrigin: true }));
// app.use('/users', createProxyMiddleware({ target: process.env.USER_URL, changeOrigin: true }));
// app.use('/parking', createProxyMiddleware({ target: process.env.PARKING_URL, changeOrigin: true }));

// app.listen(port, () => {
//  console.log(`API Gateway berjalan pada port ${port}`);
// });

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Auth service route (PORT 5001)
app.use('/auth', createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true,
  pathRewrite: { '^/auth': '' }, // Jadi /auth/login → /login
  selfHandleResponse: false, 
  onProxyReq: (proxyReq, req, res) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData); // Inilah yang ngirim body-nya
    }
  }
}));


// Proxy untuk /users/* → user-service (port 5002)
app.use('/users', createProxyMiddleware({
  target: 'http://localhost:5002',
  changeOrigin: true,
  pathRewrite: { '^/users': '' },
  onProxyReq: (proxyReq, req, res) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  }
}));

// Proxy untuk /parking/* → parking-service (port 5003)
app.use('/parking', createProxyMiddleware({
  target: 'http://localhost:5003',
  changeOrigin: true,
  pathRewrite: { '^/parking': '' },
  onProxyReq: (proxyReq, req, res) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  }
}));

// Nyalakan gateway
app.listen(5000, () => {
  console.log('✅ API Gateway is running on port 5000');
});