const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const config = require('./config.json');

const HTTP_SERVER_PORT = 3000;
const MAX_CONNECTIONS_COUNT = 5;

const maxConnectionsCnt = config.maxConnection || MAX_CONNECTIONS_COUNT;
const port = config.port || HTTP_SERVER_PORT;

let usersCount = 0;
let chatUsers = [];

server.listen(port, () => {
  console.log('Server is started...');
  console.log('\nConfiguration:');
  console.log(`\tport: ${port}`);
  console.log(`\tmax connections number: ${maxConnectionsCnt}`);
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
          body: `Hello, ${user}! Number of users: ${usersCount}`
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
      }
    });

});
