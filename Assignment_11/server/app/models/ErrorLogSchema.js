const mongoose = require('mongoose');

const ErrorLogSchema = new mongoose.Schema(
  {
    timestamp: { type: Date, default: Date.now },
    error: String,
    notes: String,
  },
  {
    capped: { size: 102400, autoIndexId: true },
    versionKey: false,
  });

// compile and export our model
module.exports = mongoose.model('ErrorLog', ErrorLogSchema);
