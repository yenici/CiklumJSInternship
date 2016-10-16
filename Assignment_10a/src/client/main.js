require('./main.scss');

document.addEventListener('DOMContentLoaded', () => {
  // Login form elements
  const loginPage = document.getElementsByClassName('chat-login')[0];
  const loginField = document.getElementById('loginField');
  const loginForm = document.getElementsByClassName('chat-login__form')[0];
  // Error form elements
  const errorPage = document.getElementsByClassName('chat-error')[0];
  const errorMessage = document.getElementsByClassName('chat-error__message')[0];
  const errorBtn = document.querySelector('.chat-error > button');
  // Main chat elements
  const mainPage = document.getElementsByClassName('chat-main')[0];
  // Message panel's elements
  const messageArea = document.getElementsByClassName('chat-wrapper')[0];
  const sendForm = document.getElementsByClassName('chat-panel')[0];
  const msgField = document.getElementById('msgField');

  const socket = io();

  socket
    .on('service_msg', (message) => {
      addServiceMessage(message);
    })
    .on('chat_msg', (message) => {
      addChatMessage(message);
    });

  let userName;
  let userConnected = false;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (loginField.value.trim().length > 2) {
      userName = loginField.value.trim();
      loginField.value = '';
      socket.emit('join', userName, (message) => {
        if (message.success) {
          loginPage.style.display = 'none';
          mainPage.style.display = 'block';
          userName = message.user;
          userConnected = true;
          for (let i = 0; i < message.history.length; i += 1) {
            addChatMessage(message.history[i]);
          }
          // for (msg of message.history) {
          //   addChatMessage(msg);
          // }
          addServiceMessage(message);
        } else {
          loginPage.style.display = 'none';
          errorPage.style.display = 'block';
          errorMessage.textContent = message.body;
          errorBtn.focus();
        }
      });
    }
  });

  errorBtn.addEventListener('click', (e) => {
    loginPage.style.display = 'flex';
    errorPage.style.display = 'none';
  });

  sendForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (msgField.value.trim().length > 0) {
      socket.emit('chat_msg', msgField.value.trim(), (message) => {
        addChatMessage(message);
        msgField.value = '';
      });
    }
    msgField.focus();
  });

  function addServiceMessage(message) {
    const msg = document.createElement('div');
    msg.className = 'service-message';
    msg.innerHTML = `${new Date(message.timestamp).toLocaleDateString()} `
      + `${new Date(message.timestamp).toLocaleTimeString()} - `
      + `<span>${message.body}</span>`;
    messageArea.appendChild(msg);
    msg.scrollIntoView();
  }

  function addChatMessage(message) {
    const msg = document.createElement('div');
    msg.className = (message.from === userName) ? 'chat-message--own' : 'chat-message';
    const msgInfo = document.createElement('div');
    msgInfo.className = 'chat-message__info';
    const from = (message.from === userName) ? '<span>' : `${message.from}<span> - `;
    msgInfo.innerHTML = `${from}`
      + `${new Date(message.timestamp).toLocaleDateString()} `
      + `${new Date(message.timestamp).toLocaleTimeString()}</span>`;
    const msgBody = document.createElement('div');
    msgBody.className = 'chat-message__body';
    msgBody.textContent = message.body;
    msg.appendChild(msgInfo);
    msg.appendChild(msgBody);
    messageArea.appendChild(msg);
    msg.scrollIntoView();
  }
});
