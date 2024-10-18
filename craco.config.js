const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        pathRewrite: { "^/api": "/api" }, // За потреби можна модифікувати шлях
      },
    },
  },
};
