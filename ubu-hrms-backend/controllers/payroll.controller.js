const Payment = require('../models/Payment.model');
const Attendance = require('../models/Attendance.model');
const Employee = require('../models/Employee.model');
const axios = require('axios');
const { getAccessToken, getSecurityCredential } = require('../utils/mpesa.utils');

// Calculate payroll (updated for period, sums per attendance)
const calculatePayroll = async (req, res) => {
  const { period } = req.params;  // e.g., '2026-03'
  try {
    const employees = await Employee.find();
    const payrollData = [];

    for (const employee of employees) {
      const attendances = await Attendance.find({
        employeeId: employee._id,
        attendanceDate: { $gte: new Date(`${period}-01`), $lte: new Date(`${period}-31`) },
      });

      const totalHours = attendances.reduce((sum, att) => sum + (att.totalHoursWorked || 0), 0);
      const amount = totalHours * employee.wageRate;

      payrollData.push({ employee, totalHours, amount, attendances });
    }

    res.json(payrollData);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Disburse payment (updated to optionally link attendanceId)
const disbursePayment = async (req, res) => {
  const { employeeId, amount, period, attendanceId } = req.body;  // Added attendanceId

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });

    const accessToken = await getAccessToken();
    const securityCredential = getSecurityCredential();

    const url = process.env.MPESA_ENV === 'production'
      ? 'https://api.safaricom.co.ke/mpesa/b2c/v1/paymentrequest'
      : 'https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest';

    const response = await axios.post(url, {
      InitiatorName: 'testapi',
      SecurityCredential: securityCredential,
      CommandID: 'SalaryPayment',
      Amount: amount,
      PartyA: process.env.MPESA_SHORTCODE,
      PartyB: employee.mpesaPhoneNumber,
      Remarks: `Payroll for ${period}`,
      QueueTimeOutURL: process.env.MPESA_QUEUE_TIMEOUT_URL,
      ResultURL: process.env.MPESA_CALLBACK_URL,
      Occasion: 'Payroll',
    }, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const payment = new Payment({
      employeeId,
      attendanceId,  // Link if provided
      amountPaid: amount,
      payrollPeriod: period,
      b2cConversationId: response.data.ConversationID,
    });
    await payment.save();

    res.json({ msg: 'Payment request sent', data: response.data });
  } catch (err) {
    res.status(500).json({ msg: 'Payment failed', error: err.message });
  }
};

// Callback (updated field names)
const paymentCallback = async (req, res) => {
  const { Result } = req.body;

  try {
    const { ResultCode, ResultDesc, OriginatorConversationID, ConversationID, TransactionID, ReceiptNo } = Result.ResultParameters.ResultParameter;

    const payment = await Payment.findOne({ b2cConversationId: OriginatorConversationID || ConversationID });
    if (!payment) return res.status(404).json({ msg: 'Payment not found' });

    payment.paymentStatus = ResultCode === 0 ? 'Paid' : 'Pending';  // Use ER enums
    payment.mpesaReceiptNumber = ReceiptNo;
    payment.transactionId = TransactionID;
    payment.paymentDate = new Date();

    await payment.save();
    res.status(200).json({ msg: 'Callback received' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Timeout (unchanged)
const paymentTimeout = async (req, res) => {
  res.status(200).json({ msg: 'Timeout received' });
};

// Get payments (unchanged)
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = { calculatePayroll, disbursePayment, paymentCallback, paymentTimeout, getPayments };