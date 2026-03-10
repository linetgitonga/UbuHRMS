const mongoose = require('mongoose');

const kpiSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  kpiName: { type: String, required: true },
  targetValue: { type: Number, required: true },
  achievedValue: { type: Number, default: 0 },
  reviewDate: { type: Date, required: true },
});

module.exports = mongoose.model('KPI', kpiSchema);