const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  attendanceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' },  // Added FK
  amountPaid: { type: Number, required: true },  // Renamed from amount
  paymentDate: { type: Date },
  paymentStatus: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
  mpesaReceiptNumber: { type: String },
  transactionId: { type: String },
  b2cConversationId: { type: String },
  payrollPeriod: { type: String },  // Kept for period grouping
});

module.exports = mongoose.model('Payment', paymentSchema);