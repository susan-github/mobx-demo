const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const TestWebpackPlugin = require('../plugins/test')

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    port: 9000,
  },
  plugins: [
    new TestWebpackPlugin({ name: 'Susan' })
  ]
}

module.exports = webpackMerge(commonConfig, devConfig)