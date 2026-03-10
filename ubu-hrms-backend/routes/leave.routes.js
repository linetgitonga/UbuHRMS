const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { getLeaves, addLeave, updateLeave, deleteLeave } = require('../controllers/leave.controller');

const router = express.Router();

router.get('/:employeeId', auth, getLeaves);
router.post('/', auth, addLeave);
router.put('/:id', auth, updateLeave);
router.delete('/:id', auth, deleteLeave);

module.exports = router;