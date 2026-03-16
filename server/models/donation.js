// models/Donation.js
const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  foodbank: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodBank' },
  items: [{ 
    name: String, 
    quantity: Number, 
    unit: String 
  }],
  status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' },
  pickupTime: Date,
  // Add more fields as needed
});

module.exports = mongoose.model('Donation', DonationSchema);