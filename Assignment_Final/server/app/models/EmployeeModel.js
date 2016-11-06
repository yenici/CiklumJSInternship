const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    firstName: {type: String, trim: true, required: true },
    lastName: {type: String, trim: true, required: true },
    email: {type: String, trim: true, required: true },
    photo: Buffer,
  },
  {
    timestamps: true,
  });

employeeSchema.virtual('name')
  .get(function() {
    return `${this.firstName} ${this.lastName}`;
  });

employeeSchema.virtual('name')
  .set(function (name) {
    const split = name.split(' ');
    this.firstName = split[0];
    this.lastName = split[1];
  });

employeeSchema.index({ 'firstName': 'text', 'lastName': 'text', email: 'text' });

// compile and export our model
module.exports = mongoose.model('Employee', employeeSchema);
