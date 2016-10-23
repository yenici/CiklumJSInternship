const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/UserSchema');
var config = require('./config.json');

module.exports = function(passport) {
  const opts = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
  };
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload.sub }, function(err, user) {
      if (err) {
        done(err, false);
      }
      if (user) {
        done(null, { id: user._id, name: user.username });
      } else {
        done(null, false);
      }
    });
  }));
};
