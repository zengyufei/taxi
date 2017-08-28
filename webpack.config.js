const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const domains = require('./src/configs/domains')

module.exports = (webpackConfig, env) => {
  // 环境判断
  // process.env.NODE_ENV === 'development'
  // process.env.NODE_ENV === 'dev'
  // process.env.NODE_ENV === 'local'
  // process.env.NODE_ENV === 'remote'
  // webpackConfig配置
  const path = require('path')
  const _ = require('lodash')
  const ExtractTextPlugin = require('extract-text-webpack-plugin')

  const ROOT_PATH = path.resolve(__dirname)
  const APP_PATH = path.resolve(ROOT_PATH, 'src')
  const OUTPUT_PATH = path.resolve(ROOT_PATH, 'dist')

  // 输出配置暂时不配置hash串，[hash:8]
  webpackConfig.output = {
    path: OUTPUT_PATH,
    filename: 'static/[name]-[hash:6].js',
    pathinfo: true,
    // publicPath: './',
    // 按需加载
    chunkFilename: 'static/chunk/[name]-[chunkhash:6].js',
  }

  // 模块支持
  webpackConfig.module = {
    loaders: [
      {
        exclude: [/\.(jsx?)$/, /\.(less|css)$/, /\.html$/, /\.ejs$/, /\.json$/, /\.(jpe?g|gif|png|webp|bmp)$/, /\.(svg|woff2?|ttf|eot)\??(.*?)$/],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/other/[name].[ext]',
        },
      }, {
        test: /\.(jsx?)$/,
        loader: 'babel?cacheDirectory=.cache',
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        include: APP_PATH,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:8]!postcss'),
      }, {
        test: /\.less$/,
        include: APP_PATH,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:8]!postcss!less'),
      }, {
        test: /\.css$/,
        include: path.resolve(ROOT_PATH, 'node_modules'),
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss'),
      }, {
        test: /\.less$/,
        include: path.resolve(ROOT_PATH, 'node_modules'),
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss!less'),
      }, {
        test: /\.json$/,
        loader: 'json',
      }, {
        test: /\.(jpe?g|gif|png|webp|bmp)$/,
        loader: 'file?name=static/images/[name].[ext]',
      }, {
        test: /\.(svg|woff2?|ttf|eot)\??(.*?)$/,
        loader: 'file?name=static/fonts/[name].[ext]',
      },
    ],
  }

  // 插件增加
  // 开发环境插件
  let isExtractTextPlugin = false
  for (const x in webpackConfig.plugins) {
    if (Object.prototype.hasOwnProperty.call(webpackConfig.plugins, x)) {
      const constructorName = webpackConfig.plugins[x].constructor.name
      if (constructorName === 'DefinePlugin') {
        let pluginsDefinitions = {
          IS_DEV: JSON.stringify((env === 'development')),
          NODE_ENV: JSON.stringify(env),
        }
        if (domains[env]) {
          domains[env].baseUrl && (pluginsDefinitions.BASE_URL = JSON.stringify(domains[env].baseUrl))
          const uploadUrl = domains[env].uploadUrl
          if (uploadUrl) {
            if (/\/$/.test(uploadUrl)) { pluginsDefinitions.UPLOAD_URL = JSON.stringify(uploadUrl) } else { pluginsDefinitions.UPLOAD_URL = JSON.stringify(`${uploadUrl}/`) }
          }
        } else if (env === 'production') {
          pluginsDefinitions.BASE_URL = JSON.stringify('/')
          pluginsDefinitions.UPLOAD_URL = JSON.stringify('/upload/')
        }
        webpackConfig.plugins[x].definitions = _.assign({}, webpackConfig.plugins[x].definitions, pluginsDefinitions)
      }
      // CommonsChunkPlugin
      if (constructorName === 'CommonsChunkPlugin') {
        webpackConfig.plugins[x].filenameTemplate = 'static/common-[chunkhash:6].js'
      }
      // webpack替换
      if (constructorName === 'ExtractTextPlugin') {
        isExtractTextPlugin = true
        webpackConfig.plugins[x] = new ExtractTextPlugin('static/[name]-[chunkhash:6].css', { allChunks: true })
      }
    }
  }

  if (!isExtractTextPlugin) {
    webpackConfig.plugins.push(new ExtractTextPlugin('static/[name]-[chunkhash:6].css', { allChunks: true }))
  }

  if (env === 'production') {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false, // remove all comments
      },
      compress: {
        warnings: false,
      },
    }))
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    title: '中智仿真',
    filename: 'index.html',
    template: './src/template.html',
    inject: true,
    chunks: ['index'],
    hash: true,
    cache: false,
  }))

  // 全局暴露React
  webpackConfig.plugins.push(
    new webpack.ProvidePlugin({
      React: 'react',
      PropTypes: 'prop-types',
      ZMsg: 'ZMsg',
      ZButton: 'ZButton',
      R: 'ramda',
      _: 'lodash',
      moment: 'moment',
      local: `${__dirname}/src/components/carno/utils/storage/localStorage`,
      session: `${__dirname}/src/components/carno/utils/storage/sessionStorage`,
      constant: `${__dirname}/src/configs/constant`, // 常量,
      projectConfig: `${__dirname}/src/configs/projectConfig`, // 一般配置,
    }),
  )

  // PreLoaders
  // webpackConfig.module.preLoaders = [{
  //   test: /\.js$/,
  //   enforce: 'pre',
  //   loader: 'eslint',
  // }]


  // Alias
  webpackConfig.resolve.alias = {
    src: `${__dirname}/src`, // 源码目录

    assets: `${__dirname}/src/assets`, // 静态文件目录

    configs: `${__dirname}/src/configs`, // 一般配置

    models: `${__dirname}/src/models`, // model 集合
    services: `${__dirname}/src/services`, // model 集合

    routes: `${__dirname}/src/routes`, // 路由集合
    pages: `${__dirname}/src/pages`, // 页面集合

    components: `${__dirname}/src/components`, // 组件集合
    /**
     * 自定义组件
     */
    ZButton: `${__dirname}/src/components/ZButton`,
    ZMsg: `${__dirname}/src/components/ZMsg`,

    carno: `${__dirname}/src/components/carno`, // 再封装 dva 集合
    ZForm: `${__dirname}/src/components/carno/components/Form/Form`, // 表单封装
    ZFormItem: `${__dirname}/src/components/carno/components/Form/FormItem`, // 表单封装
    ModelUtils: `${__dirname}/src/components/carno/utils/model`, // model 封装
    TableUtils: `${__dirname}/src/components/carno/utils/table`, // 表格封装
    FormUtils: `${__dirname}/src/components/carno/utils/form`, // 表格封装
    ZModal: `${__dirname}/src/components/carno/components/Modal`, // 模态窗口封装
    ZSearch: `${__dirname}/src/components/carno/components/SearchBar`, // 搜索框封装

    utils: `${__dirname}/src/utils`, // 工具类集合

    enums: `${__dirname}/src/utils/enums`, // 枚举类集合
  }

  return webpackConfig
}
