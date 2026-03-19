const express = require('express');
const auth = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { getContracts, addContract, updateContract, deleteContract } = require('../controllers/contract.controller');

const router = express.Router();

router.get('/:employeeId', auth, roleMiddleware(['admin', 'manager']), getContracts);  // View: Both
router.post('/', auth, roleMiddleware(['admin']), addContract);  // Create: Admin only
router.put('/:id', auth, roleMiddleware(['admin']), updateContract);  // Update: Admin only
router.delete('/:id', auth, roleMiddleware(['admin']), deleteContract);  // Delete: Admin only

module.exports = router;