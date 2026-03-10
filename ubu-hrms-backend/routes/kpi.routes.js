const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { getKPIs, addKPI, updateKPI, deleteKPI } = require('../controllers/kpi.controller');

const router = express.Router();

router.get('/:employeeId', auth, getKPIs);
router.post('/', auth, addKPI);
router.put('/:id', auth, updateKPI);
router.delete('/:id', auth, deleteKPI);

module.exports = router;