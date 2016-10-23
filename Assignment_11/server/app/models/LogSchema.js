const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema(
  {
    timestamp: { type: Date, default: Date.now },
    clientIP: String,
    authenticated: Boolean,
    originalUrl: String,
    params: String,
    query: String,
  },
  {
    capped: { size: 102400, autoIndexId: true },
    versionKey: false,
  });

// compile and export our model
module.exports = mongoose.model('Log', LogSchema);
