// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication.middleware');
const notificationController = require('../controllers/notification.controller');

router.get('/', auth, notificationController.getNotifications);

router.put('/:id/read', auth, notificationController.markAsRead);

router.put('/read-all', auth, notificationController.markAllAsRead);

router.delete('/:id', auth, notificationController.deleteNotification);

module.exports = router;