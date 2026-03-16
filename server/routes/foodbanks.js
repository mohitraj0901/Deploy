// routes/foodbanks.js
const express = require('express');
const router = express.Router();
const FoodBank = require('../models/foodbank');
// Add authentication middleware

// Get all food banks
router.get('/', async (req, res) => {
  try {
    const foodbanks = await FoodBank.find();
    res.json(foodbanks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add more routes for CRUD operations on food banks

module.exports = router;
