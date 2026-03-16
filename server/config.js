// config.js
module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiration: '24h'
  };