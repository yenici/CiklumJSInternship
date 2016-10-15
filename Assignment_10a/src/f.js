const util = require('util');
const stream = require('stream');
var Writable = stream.Writable;


const fs = require('fs');
const async = require('async');
const path = require('path');
const filepath = path.join(__dirname, '/public/messages.json');

// async.waterfall([
//   (callback) => {},
//   (callback) => {},
//   (callback) => {}
// ]);

const filepath = path.join(__dirname, '/public/logger.json');
async.waterfall([
  (callback) => {
    fs.stat(filepath, (err, stat) => {
      callback(null, stat);
    });
  },
  (stat, callback) => {
    if (!stat) {
      var startContent = {messages: []};
      return callback(null, JSON.stringify(startContent));
    }
    fs.readFile(filepath, 'utf8', callback);
  }
], (err, fileContent) => {
  if (err) return console.log('error: ', err);
  var newContent = JSON.parse(fileContent);
  newContent.messages.push({
    name: socket.username,
    text: data
  });
  newContent = JSON.stringify(newContent);
  fs.writeFile(filepath, newContent, function(err) {
    if (err) return console.log('error: ', err);
    console.log("The file was saved!");
  });
});
