const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true },
    salt: { type: String, required: true },
  },
  {
    timestamps: true,
  });

UserSchema.methods.encryptPassword = function(password) {
  // return crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
};

UserSchema.virtual('password')
  .set(function(password) {
    this.salt = crypto.randomBytes(128).toString('base64');
    this.hashedPassword = this.encryptPassword(password);
  });

UserSchema.methods.verifyPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

// compile and export our model
module.exports = mongoose.model('User', UserSchema);
