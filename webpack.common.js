const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: './index.js',
  context: __dirname + '/src/',
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-srcsets-loader',
          options: {
            interpolate: 'require',
            attrs: ['img:src', 'img:srcset', 'source:srcset', 'link:href']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash:20].[ext]',
              limit: 8192,
              publicPath: '/'
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf)([?]?.*)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash:20].[ext]',
              publicPath: '/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new StyleLintPlugin()
  ]
};
