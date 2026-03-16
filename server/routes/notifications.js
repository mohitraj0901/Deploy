// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notifications');
const auth = require('../middleware/auth');
const { sendNotification } = require('../server');

// Get all notifications for a user
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Mark a notification as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user.id },
      { $set: { read: true } },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ msg: 'Notification not found' });
    }

    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new notification (for testing purposes)
router.post('/test', auth, async (req, res) => {
  try {
    const { type, message } = req.body;
    const newNotification = new Notification({
      recipient: req.user.id,
      type,
      message
    });

    await newNotification.save();

    // Send real-time notification
    sendNotification(req.user.id, newNotification);

    res.json(newNotification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;