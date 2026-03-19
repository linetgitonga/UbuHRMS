const express = require('express');
const auth = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { calculatePayroll, disbursePayment, paymentCallback, paymentTimeout, getPayments } = require('../controllers/payroll.controller');

const router = express.Router();

router.get('/calculate/:period', auth, roleMiddleware(['admin', 'manager']), calculatePayroll);  // Calculate: Both
router.post('/disburse', auth, roleMiddleware(['admin']), disbursePayment);  // Disburse: Admin only (sensitive)
router.post('/payments/callback', paymentCallback);  // Public for Safaricom
router.post('/payments/timeout', paymentTimeout);  // Public for Safaricom
router.get('/payments', auth, roleMiddleware(['admin', 'manager']), getPayments);  // View: Both

module.exports = router;