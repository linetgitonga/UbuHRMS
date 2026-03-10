const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { getContracts, addContract, updateContract, deleteContract } = require('../controllers/contract.controller');

const router = express.Router();

router.get('/:employeeId', auth, getContracts);
router.post('/', auth, addContract);
router.put('/:id', auth, updateContract);
router.delete('/:id', auth, deleteContract);

module.exports = router;