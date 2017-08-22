export default {
  "entry": "src/index.js",
  "theme" : "./theme.js",
  "env": {

      "development": {
        "extraBabelPlugins": [
          "dva-hmr",
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": "css" }]
        ],
      },

      "production": {
        "extraBabelPlugins": [
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": "css" }]
        ]
      },
      
      "remote": {
          "extraBabelPlugins": [
            "dva-hmr",
            "transform-runtime",
            ["import", { "libraryName": "antd","libraryDirectory": "lib",  "style": "css" }]
          ],
      },
      
      "local": {
          "extraBabelPlugins": [
            "dva-hmr",
            "transform-runtime",
            ["import", { "libraryName": "antd","libraryDirectory": "lib",  "style": "css" }]
          ],
      },
      
      "localIp": {
          "extraBabelPlugins": [
            "dva-hmr",
            "transform-runtime",
            ["import", { "libraryName": "antd","libraryDirectory": "lib",  "style": "css" }]
          ],
      }
  }
}
