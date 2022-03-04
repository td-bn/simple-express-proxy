'use strict';

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Constants
const PORT = 3001;
const HOST = '0.0.0.0';
const SERVER = 'www.example.com';
const TOKEN = 'Bearer supersecretbearertoken';
// App
const app = express();

app.use('/', createProxyMiddleware({
  target: SERVER,
  changeOrigin: true,
  pathRewrite: function (path, req) { return path.replace('/api', '') },
  onProxyReq: function (proxyReq, req, res) {
    // Set header on proxy request
    proxyReq.setHeader('Authorization', TOKEN);
  }
}));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
