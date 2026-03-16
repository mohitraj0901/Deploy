// models/FoodBank.js
const mongoose = require('mongoose');

const FoodBankSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  // Add more fields as needed
});

module.exports = mongoose.model('FoodBank', FoodBankSchema);