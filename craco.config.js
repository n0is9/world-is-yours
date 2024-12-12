const { createProxyMiddleware } = require('http-proxy-middleware');
const CracoAlias = require('craco-alias');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' },
      },
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
      },
    },
  ],
};
