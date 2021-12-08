const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
        // server/index.js에서 정의한 port번호가 5000번이니까 target을 5000번으로 설정
        // front end 3000번 -> back end 5000번으로 주겠다고 설정해 놓음
        target: 'http://localhost:5000',
        changeOrigin: true,
        })
    );
};