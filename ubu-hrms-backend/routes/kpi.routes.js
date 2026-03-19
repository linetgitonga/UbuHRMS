const express = require('express');
const auth = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { getKPIs, addKPI, updateKPI, deleteKPI } = require('../controllers/kpi.controller');

const router = express.Router();

router.get('/:employeeId', auth, roleMiddleware(['admin', 'manager']), getKPIs);  // View: Both
router.post('/', auth, roleMiddleware(['admin']), addKPI);  // Create: Admin only
router.put('/:id', auth, roleMiddleware(['admin']), updateKPI);  // Update: Admin only
router.delete('/:id', auth, roleMiddleware(['admin']), deleteKPI);  // Delete: Admin only

module.exports = router;