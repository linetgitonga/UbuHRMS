const express = require('express');
const auth = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { pushBiometric, getAttendance, adjustAttendance } = require('../controllers/attendance.controller');

const router = express.Router();

router.post('/biometrics/push', pushBiometric);  // Public for device
router.get('/:employeeId', auth, roleMiddleware(['admin', 'manager']), getAttendance);  // View: Both
router.put('/:id', auth, roleMiddleware(['admin', 'manager']), adjustAttendance);  // Adjust: Both (managers can fix attendance)

module.exports = router;