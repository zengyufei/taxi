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
        "define": {
          "VERSION": "1.0",
          "WEBSITE": "http://www.zzsim.com",
       }
      },





      "production": {
        "extraBabelPlugins": [
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": "css" }]
        ]
      },
      
      "remote": {
          "define": {
            "VERSION": "1.0",
            "WEBSITE": "http://www.zzsim.com",
            "BASEURL": "http://192.168.46.219:8001/",
            "UPLOADPATH": "http://192.168.46.219:8001/upload/"
          },
          "extraBabelPlugins": [
            "dva-hmr",
            "transform-runtime",
            ["import", { "libraryName": "antd","libraryDirectory": "lib",  "style": "css" }]
          ],
      },
  }
}
