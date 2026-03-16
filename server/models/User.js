// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['restaurant', 'foodbank', 'admin'],
    //required: true
  },
  address: {
    street: {
      type: String,
      //  required: true
    },
    city: {
      type: String,
      //  required: true
    },
    state: {
      type: String,
      //  required: true
    },
    zip: {
      type: String,
      // required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
