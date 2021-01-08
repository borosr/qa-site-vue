module.exports = {
  "devServer": {
    "proxy": {
      "^/api": {
        "target": "localhost:8000",
        "ws": true,
        "changeOrigin": true
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}