const ErrorLog = require('../models/ErrorLogSchema');

const errorLogger = (err, note ='') => {
  const error = new ErrorLog({
    error: JSON.stringify(err),
    note,
  });
  error.save((err) => {
    if (err) {
      console.log('ERROR:');
      console.log(err);
    }
  });
};

module.exports = errorLogger;
