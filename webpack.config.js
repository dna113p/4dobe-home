const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
     app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    watchContentBase: true
  },
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};