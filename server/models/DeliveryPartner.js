// models/DeliveryPartner.js
const mongoose = require('mongoose');

const DeliveryPartnerSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  name: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  vehicleType: { 
    type: String, 
    required: true 
  },
  vehicleNumber: { 
    type: String, 
    required: true 
  },
  licenseNumber: { 
    type: String, 
    required: true 
  },
  isAvailable: { 
    type: Boolean, 
    default: true 
  },
  currentLocation: {
    lat: Number,
    lng: Number
  },
  rating: { 
    type: Number, 
    default: 0 
  },
  totalDeliveries: { 
    type: Number, 
    default: 0 
  },
  activeDelivery: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Delivery' 
  }
});

module.exports = mongoose.model('Deliverypartner', DeliveryPartnerSchema);