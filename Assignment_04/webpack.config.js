/* global require, __dirname: true */

const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: __dirname.concat('/src/scripts/app.js'),
  },

  output: {
    path: __dirname.concat('/dist'),
    publicPath: '',
    filename: 'scripts/[name].bundle.js',
  },

  devtool: 'source-map',

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
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json',
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
        test: /\.ico$/,
        loader: 'file?name=../images/[name].[ext]',
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
      favicon: 'src/images/favicon.ico',
      hash: true,
      template: 'src/index.html',
    }),
  ],

};
