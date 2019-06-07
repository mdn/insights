const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

const commonConfig = require('./webpack.common');

const config = merge(commonConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].[hash:20].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '/css/[name].min.[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        map: {
          inline: false
        },
        discardComments: {
          removeAll: true
        },
        discardUnused: false
      },
      canPrint: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      }
    })
  ]
});

// For prod we must load css in this order:
// * Sass-loader
// * Postcss-loader
// * Css-loader
// * MiniCssExtractPlugin.loader
config.module.rules = config.module.rules.map(rule => {
  if (rule.test.toString() === '/\\.(scss|css)$/') {
    rule.use[0] = MiniCssExtractPlugin.loader;
  }

  return rule;
});

module.exports = config;
