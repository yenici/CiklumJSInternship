const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');

const config = require('./config.json');

const HTTP_SERVER_PORT = 3000;
const MAX_CONNECTIONS_COUNT = 5;
const MESSAGES_FILE = './messages.json';

const maxConnectionsCnt = config.maxConnection || MAX_CONNECTIONS_COUNT;
const port = process.env.PORT || config.port || HTTP_SERVER_PORT;
const messagesFile = config.messages || MESSAGES_FILE;

let usersCount = 0;
let chatUsers = [];
let messageStore = [];

// Read all messages from history
fs.readFile(messagesFile, 'utf8', (err, messages) => {
  if (err) {
    console.log('A new storage will be created.');
  } else {
    messageStore = JSON.parse(messages).chat;
  }
});

server.listen(port, () => {
  console.log('Server is started...');
  console.log('\nConfiguration:');
  console.log(`\tport: ${port}`);
  console.log(`\tmax connections number: ${maxConnectionsCnt}`);
  console.log(`\tmessages store: ${messagesFile}`);
});

app.use(express.static(__dirname.concat('/client')));

io.on('connection', (socket) => {

  let userJoined;

  socket
    .on('join', (userName, callback) => {
      if (usersCount < maxConnectionsCnt) {
        let user = userName.trim();
        let i = 1;
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
          user,
          body: `Hello, ${user}! Number of users: ${usersCount}`,
          history: messageStore
        });
        socket.to('chat').volatile.broadcast.emit('service_msg', {
          timestamp: new Date(),
          body: `${user} has joined the conversation. Number of users: ${usersCount}`
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
    })
    .on('disconnect', () => {
      if (userJoined) {
        userJoined = false;
        chatUsers = chatUsers.filter(user => user !== socket.userName);
        usersCount -= 1;
        socket.to('chat').volatile.broadcast.emit('service_msg', {
          timestamp: new Date(),
          body: `${socket.userName} has left the conversation. Number of users: ${usersCount}`
        });
      }
    })
    .on('chat_msg', (msg, callback) => {
      if (userJoined) {
        const message = {
          from: socket.userName,
          timestamp: new Date(),
          body: msg
        };
        socket.to('chat').broadcast.emit('chat_msg', message);
        callback(message);
        messageStore.push(message);
        // Save message in a file
        fs.writeFile(messagesFile,
          JSON.stringify({ chat: messageStore }),
          (err) => {
            if (err) console.log(err);
          });
      }
    });
});
