const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // /api로 시작하면 url에 적용
    createProxyMiddleware({
      target: 'http://localhost:5000',
      secure: false,
      changeOrigin: true,
    })
  );
};
