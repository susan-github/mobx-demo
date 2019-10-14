const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const prodConfig = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.[hash].js'
  },
  mode: 'production',
}

module.exports = webpackMerge(commonConfig, prodConfig)