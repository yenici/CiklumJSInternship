/* global module, require:true */

var path = require('./pathes'),
  connect = require('gulp-connect');

module.exports = function() {
  'use strict';
  connect.server({
    root: path.dist.root,
    host: 'localhost',
    port: 3000,
    livereload: true,
    debug: true
  });
};
