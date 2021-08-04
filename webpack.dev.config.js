const path = require('path');
const { mergeWithCustomize } = require('webpack-merge');

const commonConfig = require('./webpack.common.config.js')

const devConfig = {
  devtool: 'inline-source-map',
 
  /*入口*/
  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, 'src/index.js'),
    ],
    
  },

  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },

  devServer: {
    port: 8081, 
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    host: 'localhost'
  }
};

module.exports = mergeWithCustomize({
  customizeArray(a, b, key) {
      /*entry.app不合并，全替换*/
      if (key === 'entry.app') {
          return b;
      }
      return undefined;
  }
})(commonConfig, devConfig);