module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        hostRewrite: 'localhost:8081',
        pathRewrite: {
          '^/api': '/api'
        },
        headers: {
          Connection: 'keep-alive'
        }
      }
    }
  },
  transpileDependencies: [
    "vuetify"
  ]
}
