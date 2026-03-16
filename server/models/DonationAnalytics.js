// models/DonationAnalytics.js
const mongoose = require('mongoose');

const DonationAnalyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  dailyStats: {
    totalDonations: Number,
    totalQuantity: Number,
    totalMeals: Number,
    uniqueItems: Number
  },
  categoryBreakdown: [{
    category: String,
    quantity: Number,
    percentage: Number
  }],
  timeDistribution: [{
    hour: Number,
    count: Number
  }],
  cumulativeStats: {
    totalToDate: Number,
    averagePerDay: Number,
    growthRate: Number
  },
  impactMetrics: {
    wastePrevented: Number,
    carbonSaved: Number,
    peopleFed: Number
  }
});

module.exports = mongoose.model('DonationAnalytics', DonationAnalyticsSchema);