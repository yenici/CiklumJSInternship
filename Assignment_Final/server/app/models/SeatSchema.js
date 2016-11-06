const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    occupant: { type: mongoose.Schema.Types.ObjectId, default: null },
  }
);

// compile and export our model
module.exports = SeatSchema;

