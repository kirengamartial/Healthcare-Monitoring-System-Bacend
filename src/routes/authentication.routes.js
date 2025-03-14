const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication.controller');
const authMiddleware = require('../middleware/authentication.middleware');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;