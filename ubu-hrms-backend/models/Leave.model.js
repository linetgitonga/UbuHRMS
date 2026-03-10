const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  leaveType: { type: String, enum: ['Sick', 'Casual', 'Annual'], required: true },
  status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Pending' },
});

module.exports = mongoose.model('Leave', leaveSchema);