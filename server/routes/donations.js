// routes/donations.js
const express = require('express');
const router = express.Router();
const Donation = require('../models/donation');
// Add authentication middleware

// Create a new donation
router.post('/', async (req, res) => {
  try {
    const { restaurant, items, pickupTime } = req.body;
    const donation = new Donation({ restaurant, items, pickupTime });
    await donation.save();
    res.json(donation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().populate('restaurant').populate('foodbank');
    res.json(donations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add more routes for updating donation status, etc.

module.exports = router;