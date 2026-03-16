// models/Delivery.js
const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
  donation: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Donation', 
    required: true 
  },
  deliveryPartner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'DeliveryPartner' 
  },
  status: { 
    type: String, 
    enum: ['pending', 'assigned', 'picked_up', 'in_transit', 'delivered'], 
    default: 'pending' 
  },
  pickupLocation: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  dropoffLocation: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  pickupTime: Date,
  deliveryTime: Date,
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  notes: String,
  trackingUpdates: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    location: {
      lat: Number,
      lng: Number
    },
    notes: String
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Delivery', DeliverySchema);

