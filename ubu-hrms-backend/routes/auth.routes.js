const express = require('express');
const auth = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { register, login } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);  // Admin-only
router.post('/login', login);  // Public

module.exports = router;