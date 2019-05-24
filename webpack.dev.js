const commonConfig = require('./webpack.common');
const path = require('path');
const merge = require('webpack-merge');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'public')
  }
});
