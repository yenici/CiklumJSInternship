const jwt = require('jsonwebtoken');

const config = require('../config/config.json');
const errorLogger = require('../errorLogger');
const User = require('../models/UserSchema');

exports.authenticatePost = (req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) {
        errorLogger(err, 'Server error on finding user by the name.');
        res.json({
          success: false,
          message: 'Server error on finding user by the name.',
        });
      } else if (user) {
        if (user.verifyPassword(req.body.password)) {
          const token = `JWT ${jwt.sign(
            {
              iss: 'http://yenici.github.io',
              iat: Math.floor(Date.now() / 1000),
              sub: user.id,
            },
            config.secret
          )}`;
          res.json({ success: true, username: user.username, token: token });
        } else {
          res.json({ success: false, message: 'Incorrect password for this account.' });
        }
      } else {
        res.json({ success: false, message: 'Sorry! The system doesn\'t recognize this account.' });
      }
    });
  } else {
    res.json({ success: false, message: 'Incorrect credentials.' });
  }
};

exports.createPost = (req, res) => {
  if (req.body.username && req.body.password) {
    if (req.body.username.length < 4) {
      res.json({
        success: false,
        message: 'User name is too short (minimum 4 symbols).',
      });
      return;
    }
    if (req.body.username.length > 10) {
      res.json({
        success: false,
        message: 'User name is too long (maximum 10 symbols).',
      });
      return;
    }
    if (req.body.password.length < 4) {
      res.json({
        success: false,
        message: 'Password is too short (minimum 4 symbols).',
      });
      return;
    }
    if (req.body.password.length > 10) {
      res.json({
        success: false,
        message: 'Password is too long (maximum 10 symbols).',
      });
      return;
    }
    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) {
        errorLogger(err, 'Server error on finding user by the name.');
        res.json({
          success: false,
          message: 'Server error on finding user by the name.',
        });
      } else if (!user) {
        const user = new User({ username: req.body.username, password: req.body.password });
        user.save((err) => {
          if (err) {
            errorLogger(err, 'Server error on saving user.');
            res.json({
              success: false,
              message: 'Server error on saving user.',
            });
          } else {
            const token = `JWT ${jwt.sign(
              {
                iss: 'http://yenici.github.io',
                iat: Math.floor(Date.now() / 1000),
                sub: user.id,
              },
              config.secret
            )}`;
            res.json({ success: true, username: req.body.username, token: token });
          }
        });
      } else {
        res.json({ success: false, message: `The user '${req.body.username}' already exists.` });
      }
    });
  } else {
    res.json({ success: false, message: 'Incorrect credentials.' });
  }
};
