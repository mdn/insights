const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

const buildPath = path.resolve(__dirname, 'dist');
const commonConfig = require('./webpack.common');

const config = merge(commonConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[hash:20].js',
    path: buildPath
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.[contenthash].css'
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

/** For prod we must load css in this order:
 * Sass-loader
 * Postcss-loader
 * Css-loader
 * MiniCssExtractPlugin.loader
 */
config.module.rules = config.module.rules.map(rule => {
  if (rule.test.toString() === '/\\.(scss|css)$/') {
    rule.use[0] = MiniCssExtractPlugin.loader;
    rule.use.splice(2, 0, {
      loader: 'postcss-loader',
      options: {
        sourceMap: false
      }
    });
  }

  return rule;
});

module.exports = config;