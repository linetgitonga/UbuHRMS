const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { calculatePayroll, disbursePayment, paymentCallback, paymentTimeout, getPayments } = require('../controllers/payroll.controller');

const router = express.Router();

router.get('/calculate/:period', auth, calculatePayroll);
router.post('/disburse', auth, disbursePayment);
router.post('/payments/callback', paymentCallback);  // Public for Safaricom
router.post('/payments/timeout', paymentTimeout);  // Public for Safaricom
router.get('/payments', auth, getPayments);

module.exports = router;