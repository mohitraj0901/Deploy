// routes/restaurants.js
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
// Add authentication middleware

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add more routes for CRUD operations on restaurants

module.exports = router;