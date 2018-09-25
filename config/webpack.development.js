'use_strict';

const { DefinePlugin } = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      SCHEME: JSON.stringify('http'),
      HOST: JSON.stringify('localhost:3000'),
    })
  ]
};