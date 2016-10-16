/* global require, __dirname: true */

const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: __dirname.concat('/src/client/main.js'),
  },

  output: {
    path: __dirname.concat('/dist/client/'),
    publicPath: '',
    filename: '[name].bundle.js',
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    contentBase: 'dist/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style!css!postcss!sass',
      },
      {
        test: /\.html$/,
        loader: 'raw',
      },
      {
        test: /\.png$/,
        loader: 'file?name=../images/[name].[ext]',
      },
    ],
  },

  postcss: function postcss() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
      }),
    ];
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: 'src/client/favicon.png',
      template: 'src/client/index.html',
    }),
  ]
};
