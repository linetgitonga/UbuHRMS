const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  contractType: { type: String, enum: ['Short-term', 'Long-term'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  milestonePayment: { type: Number },
});

module.exports = mongoose.model('Contract', contractSchema);