const express = require('express');
const { register, login } = require('../controllers/authController.js');
const { validateRegistration, validateLogin, validate } = require('../middleware/validate.js');

const router = express.Router();

// Register route
router.post('/register', validateRegistration, validate, register);

// Login route
router.post('/login', validateLogin, validate, login);

module.exports = router;