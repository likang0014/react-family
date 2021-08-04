var { merge } = require('webpack-merge');
var webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = require('./webpack.common.config.js')

const publicConfig = {
  devtool: 'cheap-module-source-map',
  output: { publicPath: "/"},

  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    }]
  },

  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify('production')
       }
    }),
    // 每次打包前自动清理下dist文件
    new CleanWebpackPlugin(),
    // 抽取css
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:5].css',
      chunkFilename: "[id].css"
    })
  ]
};
module.exports = merge(commonConfig, publicConfig);