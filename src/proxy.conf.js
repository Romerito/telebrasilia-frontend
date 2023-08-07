const PROXY_CONFIG = [
  {
    context: [
      '/api',
    ],
    target: "http://localhost:8089",
    secure: false,
    changeOgigin: true,
    pathRewrite: {
      "^/": ""
    }

  }
]

module.exports = PROXY_CONFIG;