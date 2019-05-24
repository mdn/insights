const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

const buildPath = path.resolve(__dirname, 'dist');
const commonConfig = require('./webpack.common');

/*
TODO:
- Probably need some sort of Favicon loading.
- Need some static file loading, ie robots.txt and the like.
*/
const config = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].min.[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        map: {
          inline: false,
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
        postcss: [
          autoprefixer()
        ]
      }
    })
  ]
});

config.module.rules = config.module.rules.map(rule => {
  if (rule.test.toString() === '/\\.(scss|css)$/') {
    rule.use[0] = MiniCssExtractPlugin.loader;
    rule.use.push({
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    });
  }

  return rule;
});

module.exports = config;
