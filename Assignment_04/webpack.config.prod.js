/* global require, __dirname: true */

const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    app: __dirname.concat('/src/scripts/app.js'),
  },

  output: {
    path: __dirname.concat('/dist/scripts/'),
    publicPath: '',
    filename: '[name].bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
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
        loader: 'file?name=../[name].[ext]',
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
};
