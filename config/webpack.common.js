'use_strict';

const commonPaths = require('./common-paths');
const { ProgressPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', `${commonPaths.src}/index.js`],
  output: {
    path: commonPaths.build,
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: `${commonPaths.public}/index.html`
    }),
    new CopyWebpackPlugin([
      {
        from: `${commonPaths.public}/favicon.ico`,
        to: `${commonPaths.build}/favicon.ico`,
        toType: 'file'
      }
    ])
  ]
};