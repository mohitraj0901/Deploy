// routes/maps.js
const express = require('express');
const router = express.Router();
const googleMapsClient = require('../utils/googleMaps');
const auth = require('../middleware/auth');
const Delivery = require('../models/Delivery');
const DeliveryPartner = require('../models/DeliveryPartner');

// Geocode address
router.post('/geocode', auth, async (req, res) => {
  try {
    const { address } = req.body;
    const location = await googleMapsClient.geocode(address);
    res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Calculate delivery route
router.post('/calculate-route', auth, async (req, res) => {
  try {
    const { pickupAddress, dropoffAddress } = req.body;

    // Geocode both addresses
    const pickup = await googleMapsClient.geocode(pickupAddress);
    const dropoff = await googleMapsClient.geocode(dropoffAddress);

    // Get route details
    const route = await googleMapsClient.getDirections(
      `${pickup.lat},${pickup.lng}`,
      `${dropoff.lat},${dropoff.lng}`
    );

    // Calculate distance and duration
    const matrix = await googleMapsClient.getDistanceMatrix(
      `${pickup.lat},${pickup.lng}`,
      `${dropoff.lat},${dropoff.lng}`
    );

    res.json({
      pickup,
      dropoff,
      route,
      estimatedDistance: matrix.distance,
      estimatedDuration: matrix.duration
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Find nearby delivery partners
router.get('/nearby-partners', auth, async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query; // radius in meters

    const nearbyPartners = await DeliveryPartner.find({
      isAvailable: true,
      'currentLocation': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    });

    res.json(nearbyPartners);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update delivery tracking
router.post('/update-tracking', auth, async (req, res) => {
  try {
    const { deliveryId, currentLocation } = req.body;

    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
      return res.status(404).json({ msg: 'Delivery not found' });
    }

    // Get updated route and ETA
    const currentCoords = `${currentLocation.lat},${currentLocation.lng}`;
    const destination = `${delivery.dropoffLocation.coordinates.lat},${delivery.dropoffLocation.coordinates.lng}`;

    const matrix = await googleMapsClient.getDistanceMatrix(
      currentCoords,
      destination
    );

    // Update delivery tracking
    delivery.trackingUpdates.push({
      location: currentLocation,
      timestamp: Date.now(),
      estimatedTimeRemaining: matrix.duration.value
    });

    await delivery.save();

    res.json(delivery);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Optimize multiple delivery routes
router.post('/optimize-routes', auth, async (req, res) => {
  try {
    const { deliveries } = req.body;

    // Create waypoints from deliveries
    const waypoints = deliveries.map(delivery => ({
      location: `${delivery.pickupLocation.coordinates.lat},${delivery.pickupLocation.coordinates.lng}`,
      stopover: true
    }));

    // Get optimized route
    const optimizedRoute = await googleMapsClient.getDirections(
      waypoints[0].location,
      waypoints[waypoints.length - 1].location,
      waypoints.slice(1, -1)
    );

    res.json(optimizedRoute);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router