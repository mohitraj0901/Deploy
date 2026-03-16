// utils/googleMaps.js
const { Client } = require('@googlemaps/google-maps-services-js');

const client = new Client({});

const googleMapsClient = {
  // Geocode an address to coordinates
  async geocode(address) {
    try {
      const response = await client.geocode({
        params: {
          address,
          key: process.env.GOOGLE_MAPS_API_KEY
        }
      });

      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return {
          lat: location.lat,
          lng: location.lng,
          formattedAddress: response.data.results[0].formatted_address
        };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  },

  // Calculate distance and duration between two points
  async getDistanceMatrix(origin, destination) {
    try {
      const response = await client.distancematrix({
        params: {
          origins: [origin],
          destinations: [destination],
          key: process.env.GOOGLE_MAPS_API_KEY
        }
      });

      if (response.data.rows[0].elements[0].status === 'OK') {
        return {
          distance: response.data.rows[0].elements[0].distance,
          duration: response.data.rows[0].elements[0].duration
        };
      }
      return null;
    } catch (error) {
      console.error('Distance Matrix error:', error);
      throw error;
    }
  },

  // Get directions between two points
  async getDirections(origin, destination, waypoints = []) {
    try {
      const response = await client.directions({
        params: {
          origin,
          destination,
          waypoints,
          optimize: true,
          key: process.env.GOOGLE_MAPS_API_KEY
        }
      });

      if (response.data.status === 'OK') {
        return response.data.routes[0];
      }
      return null;
    } catch (error) {
      console.error('Directions error:', error);
      throw error;
    }
  },

  // Search for nearby locations
  async searchNearby(location, radius, type) {
    try {
      const response = await client.placesNearby({
        params: {
          location,
          radius,
          type,
          key: process.env.GOOGLE_MAPS_API_KEY
        }
      });

      if (response.data.status === 'OK') {
        return response.data.results;
      }
      return [];
    } catch (error) {
      console.error('Places Nearby error:', error);
      throw error;
    }
  }
};

module.exports = googleMapsClient;