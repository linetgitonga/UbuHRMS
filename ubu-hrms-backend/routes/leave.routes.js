const express = require('express');
const auth = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { getLeaves, addLeave, updateLeave, deleteLeave } = require('../controllers/leave.controller');

const router = express.Router();

router.get('/:employeeId', auth, roleMiddleware(['admin', 'manager']), getLeaves);  // View: Both
router.post('/', auth, roleMiddleware(['admin', 'manager']), addLeave);  // Add: Both (managers can request leaves?)
router.put('/:id', auth, roleMiddleware(['admin', 'manager']), updateLeave);  // Update/Approve: Both
router.delete('/:id', auth, roleMiddleware(['admin']), deleteLeave);  // Delete: Admin only

module.exports = router;