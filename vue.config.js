/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-18 13:58:44
 * @LastEditTime: 2019-11-29 17:18:20
 * @LastEditors: Please set LastEditors
 */
'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title
const production = process.env.NODE_ENV === 'production'

// 如果你想设置新的端口
// 例如, Mac: sudo npm run
// 您可以通过 改变port 更改端口:
// port=9528 npm run dev OR npm run dev --port=9528
// 在npm 中设置process.env.port为新的端口，process.env的属性不区分大小写
const port = process.env.PROT || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/

module.exports = {
  /**
   * 如果您计划在子路径下部署您的站点，您将需要设置publicPath，
   * 例如GitHub页面。如果您计划将您的站点部署到https://foo.github.io/bar/，
   * 然后将publicPath设置为“/bar/”。
   * 在大多数情况下请使用'/' !!
   * 细节:https://cli.vuejs.org/config/ publicpath
   */
  publicPath: './',       // 打包路径
  outputDir: 'dist',      // 打包文件名称
  assetsDir: 'static',    // 打包静态资源文件名
  lintOnSave: false, // 是否使用 ESLint 校验  process.env.NODE_ENV === 'development'
  // sourceMap：运行压缩后的文件报错后会自动指向原文件，便于deBug
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  devServer: {         // 配置开发服务器
    port: port,        // 指定要监听请求的端口号
    open: true,        // 告诉 dev-server 在 server 启动后打开浏览器。默认禁用。
    overlay: {         // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用
      warnings: false, // 警告错误
      errors: true     // 编译错误
    },
    proxy: {           // 启动代理
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: 'https://www.ahd168.com/', // 目标服务器 host
        changeOrigin: true,                      // 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求 主要解决跨域问题
        pathRewrite: {                           // 覆写路径：http://localhost:8080/api/123 = http://localhost:3001/123
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    // after: require('./mock/mock-server.js') // 挂载 mock服务器
  },
  configureWebpack: {
    // 设置路径别名
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  // 将sourcemap文件中源代码的script内容单独打包出来，区别于非源代码部分，源代码部分文件命名不包含hash字符
  configureWebpack: config => {
    if (!production) { // 当为开发环境时
      // output.devtoolXXXX之类的配置都是用来处理sourcemap文件的配置，output.devtoolModuleFilenameTemplate用于处理输出的sourcemap文件的文件名及路径。
      // output.devtoolModuleFilenameTemplate对于输出的sourcemap文件，相当于output.filename对于本地代码打包后的文件。
      config.output.devtoolModuleFilenameTemplate = info => {
        const resPath = info.resourcePath
        if ((/\.vue$/.test(resPath) && !/type=script/.test(info.identifier)) || /node_modules/.test(resPath)) {
          return `webpack:///${resPath}?${info.hash}`
        }
        return `webpack:///${resPath.replace('./src', 'my-code/src')}`
      }
    }
  },
  chainWebpack(config) {  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
