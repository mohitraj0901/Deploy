// routes/delivery.js
const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');
const DeliveryPartner = require('../models/DeliveryPartner');
const auth = require('../middleware/auth'); // Assuming you have authentication middleware

// Create a new delivery
router.post('/', auth, async (req, res) => {
  try {
    const {
      donation,
      pickupLocation,
      dropoffLocation,
      pickupTime,
      estimatedDeliveryTime
    } = req.body;

    const delivery = new Delivery({
      donation,
      pickupLocation,
      dropoffLocation,
      pickupTime,
      estimatedDeliveryTime
    });

    await delivery.save();
    res.json(delivery);
  } 
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all deliveries
router.get('/', auth, async (req, res) => {
  try {
    const deliveries = await Delivery.find()
      .populate('donation')
      .populate('deliveryPartner');
    res.json(deliveries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get delivery by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id)
      .populate('donation')
      .populate('deliveryPartner');
    
    if (!delivery) {
      return res.status(404).json({ msg: 'Delivery not found' });
    }
    
    res.json(delivery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update delivery status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status, location, notes } = req.body;
    
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ msg: 'Delivery not found' });
    }

    delivery.status = status;
    delivery.trackingUpdates.push({
      status,
      location,
      notes
    });

    if (status === 'delivered') {
      delivery.actualDeliveryTime = Date.now();
    }

    await delivery.save();
    res.json(delivery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Assign delivery partner
router.put('/:id/assign', auth, async (req, res) => {
  try {
    const { deliveryPartnerId } = req.body;
    
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ msg: 'Delivery not found' });
    }

    const deliveryPartner = await DeliveryPartner.findById(deliveryPartnerId);
    if (!deliveryPartner) {
      return res.status(404).json({ msg: 'Delivery partner not found' });
    }

    delivery.deliveryPartner = deliveryPartnerId;
    delivery.status = 'assigned';
    deliveryPartner.isAvailable = false;
    deliveryPartner.activeDelivery = delivery._id;

    await delivery.save();
    await deliveryPartner.save();
    
    res.json(delivery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update delivery partner location
router.put('/partner/:id/location', auth, async (req, res) => {
  try {
    const { lat, lng } = req.body;
    
    const deliveryPartner = await DeliveryPartner.findById(req.params.id);
    if (!deliveryPartner) {
      return res.status(404).json({ msg: 'Delivery partner not found' });
    }

    deliveryPartner.currentLocation = { lat, lng };
    await deliveryPartner.save();
    
    res.json(deliveryPartner);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get nearby delivery partners
router.get('/nearby-partners', auth, async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    // Validate query parameters
    if (!lat || !lng || !radius) {
      return res.status(400).json({ msg: 'Missing required query parameters' });
    }

    // Find delivery partners within radius (using MongoDB geospatial queries)
    const deliveryPartners = await DeliveryPartner.find({
      isAvailable: true,
      currentLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseFloat(radius) * 1000 // Convert radius to meters
        }
      }
    });

    // Return the found delivery partners
    res.json(deliveryPartners);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
