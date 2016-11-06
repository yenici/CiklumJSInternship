const mongoose = require('mongoose');

const OfficeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
  }
);

// compile and export our model
module.exports = OfficeSchema;
