'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');

var config = require('./config.json');

var HTTP_SERVER_PORT = 3000;
var MAX_CONNECTIONS_COUNT = 5;
var MESSAGES_FILE = './messages.json';

var maxConnectionsCnt = config.maxConnection || MAX_CONNECTIONS_COUNT;
var port = process.env.PORT || HTTP_SERVER_PORT;
var messagesFile = config.messages || MESSAGES_FILE;

var usersCount = 0;
var chatUsers = [];
var messageStore = [];

// Read all messages from history
fs.readFile(messagesFile, 'utf8', function (err, messages) {
  if (err) {
    console.log('A new storage will be created.');
  } else {
    messageStore = JSON.parse(messages).chat;
  }
});

server.listen(port, function () {
  console.log('Server is started...');
  console.log('\nConfiguration:');
  console.log('\tport: ' + port);
  console.log('\tmax connections number: ' + maxConnectionsCnt);
  console.log('\tmessages store: ' + messagesFile);
});

app.use(express.static(__dirname.concat('/client')));

io.on('connection', function (socket) {

  var userJoined = void 0;

  socket.on('join', function (userName, callback) {
    if (usersCount < maxConnectionsCnt) {
      var user = userName.trim();
      var i = 1;
      while (chatUsers.indexOf(user) >= 0) {
        user = userName.trim() + i;
        i += 1;
      }
      chatUsers.push(user);
      usersCount += 1;
      socket.userName = user;
      userJoined = true;
      callback({
        success: true,
        timestamp: new Date(),
        user: user,
        body: 'Hello, ' + user + '! Number of users: ' + usersCount,
        history: messageStore
      });
      socket.to('chat').volatile.broadcast.emit('service_msg', {
        timestamp: new Date(),
        body: user + ' has joined the conversation. Number of users: ' + usersCount
      });
      socket.join('chat');
    } else {
      callback({
        success: false,
        timestamp: new Date(),
        user: '',
        body: 'Sorry, but connection limit exceeded! Try to join the chat later.'
      });
    }
  }).on('disconnect', function () {
    if (userJoined) {
      userJoined = false;
      chatUsers = chatUsers.filter(function (user) {
        return user !== socket.userName;
      });
      usersCount -= 1;
      socket.to('chat').volatile.broadcast.emit('service_msg', {
        timestamp: new Date(),
        body: socket.userName + ' has left the conversation. Number of users: ' + usersCount
      });
    }
  }).on('chat_msg', function (msg, callback) {
    if (userJoined) {
      var message = {
        from: socket.userName,
        timestamp: new Date(),
        body: msg
      };
      socket.to('chat').broadcast.emit('chat_msg', message);
      callback(message);
      messageStore.push(message);
      // Save message in a file
      fs.writeFile(messagesFile, JSON.stringify({ chat: messageStore }), function (err) {
        if (err) console.log(err);
      });
    }
  });
});
