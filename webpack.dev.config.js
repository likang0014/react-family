const path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
 
  /*入口*/
  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, 'src/index.js'),
    ],
    
  },
  
  /*输出到dist文件夹，输出文件名字为bundle.js*/
  output: {
      path: path.join(__dirname, './dist'),
      filename: '[name].[contenthash:8].js',
      chunkFilename: '[name].[chunkhash].js'
  },

  resolve: {
    alias: {
        pages: path.join(__dirname, 'src/pages'),
        component: path.join(__dirname, 'src/component'),
        router: path.join(__dirname, 'src/router'),
        reduxs: path.join(__dirname, 'src/reduxs')
    }
  },

  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, 'src')
      },{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },{
        test: /\.(png|jpg|gif)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 8192
            }
        }]
      }]
  },

  devServer: {
    port: 8081,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    host: 'localhost'
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html')
    })
  ],

  optimization: {

    // 分割代码块
    splitChunks: {
      chunks: 'all',
      /**
       * initial 入口 chunk，对于异步导入的文件不处理
       * async 异步 chunk，只对异步导入的文件处理
       * all 全部 chunk，一般选择 all 模式
       */

      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: 'vendor',       // chunk 名称
          priority: 1,          // 权限更高，优先抽离（例如第三方模块同时也作为公共模块在多处引用时，按第三方模块的规则进行抽离）
          test: /node_modules/, // 检查模块是否位于 node_modules/ 目录下
          minSize: 30000,       // 大小限制（Byte），太小的不用抽离
          minChunks: 1          // 最少复用过几次（第三方模块只要引用过一次就抽取出来）
        },

        // 公共的模块
        common: {
          name: 'common',       // chunk 名称
          priority: 0,          // 优先级
          minSize: 50000,       // 公共模块的大小限制（此处设置 50KB）
          minChunks: 2          // 公共模块最少复用过几次
        }
      }
    }
  }
};