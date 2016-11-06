const mongoose = require('mongoose');

const officeSchema = require('./OfficeSchema');
const seatSchema = require('./SeatSchema');

const FloorPlanSchema = new mongoose.Schema(
  {
    office: officeSchema,
    name: { type: String, required: true },
    plan: {type: String, required: true },
    seatRadius: {type: Number, required: true },
    seats: [seatSchema],
  },
  {
    timestamps: true,
  });

FloorPlanSchema.index({ 'seats.occupant':  1 }, { sparse: true, unique: true });

// compile and export our model
module.exports = mongoose.model('FloorPlan', FloorPlanSchema);
