const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { pushBiometric, getAttendance, adjustAttendance } = require('../controllers/attendance.controller');

const router = express.Router();

router.post('/biometrics/push', pushBiometric);  // Public for device
router.get('/:employeeId', auth, getAttendance);
router.put('/:id', auth, adjustAttendance);

module.exports = router;