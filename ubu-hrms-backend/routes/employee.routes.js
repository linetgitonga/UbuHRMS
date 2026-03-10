const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { getEmployees, addEmployee, updateEmployee, deleteEmployee } = require('../controllers/employee.controller');

const router = express.Router();

router.get('/', auth, getEmployees);
router.post('/', auth, addEmployee);
router.put('/:id', auth, updateEmployee);
router.delete('/:id', auth, deleteEmployee);

module.exports = router;