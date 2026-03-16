// routes/analytics.js
const express = require('express');
const router = express.Router();
const DonationAnalytics=require("../models/DonationAnalytics")
const Donation = require('../models/donation');
const auth = require('../routes/auth');

// Get date-wise donation tracking
router.get('/datewise', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const restaurantId = req.user.restaurantId;

    // Validate dates
    if (!startDate || !endDate) {
      return res.status(400).json({ msg: 'Start date and end date are required' });
    }

    const donations = await Donation.aggregate([
      {
        $match: {
          restaurantId,
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalDonations: { $sum: 1 },
          totalQuantity: { $sum: "$quantity" },
          items: { $push: "$$ROOT" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get restaurant donation details
router.get('/restaurant-details', auth, async (req, res) => {
  try {
    const restaurantId = req.user.restaurantId;

    const details = await Donation.aggregate([
      { $match: { restaurantId } },
      {
        $group: {
          _id: null,
          totalDonations: { $sum: 1 },
          totalQuantity: { $sum: "$quantity" },
          averageQuantity: { $avg: "$quantity" },
          categories: { $addToSet: "$category" },
          mostDonatedItems: {
            $push: { item: "$itemName", quantity: "$quantity" }
          }
        }
      },
      { $unwind: "$mostDonatedItems" },
      { $sort: { "mostDonatedItems.quantity": -1 } },
      { $limit: 5 },
      {
        $project: {
          totalDonations: 1,
          totalQuantity: 1,
          averageQuantity: 1,
          categories: 1,
          mostDonatedItems: 1
        }
      }
    ]);

    res.json(details[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get quantity metrics
router.get('/quantity-metrics', auth, async (req, res) => {
  try {
    const restaurantId = req.user.restaurantId;
    const { timeframe } = req.query; // daily, weekly, monthly

    if (!['daily', 'weekly', 'monthly'].includes(timeframe)) {
      return res.status(400).json({ msg: 'Invalid timeframe' });
    }

    let groupBy;
    switch (timeframe) {
      case 'daily':
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        break;
      case 'weekly':
        groupBy = { $isoWeek: "$createdAt" };
        break;
      case 'monthly':
        groupBy = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
        break;
    }

    const metrics = await Donation.aggregate([
      { $match: { restaurantId } },
      {
        $group: {
          _id: groupBy,
          totalQuantity: { $sum: "$quantity" },
          averageQuantity: { $avg: "$quantity" },
          maxQuantity: { $max: "$quantity" },
          minQuantity: { $min: "$quantity" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(metrics);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get food item categorization
router.get('/food-categories', auth, async (req, res) => {
  try {
    const restaurantId = req.user.restaurantId;

    const categories = await Donation.aggregate([
      { $match: { restaurantId } },
      {
        $group: {
          _id: "$category",
          totalQuantity: { $sum: "$quantity" },
          itemCount: { $sum: 1 },
          items: { $addToSet: "$itemName" }
        }
      },
      {
        $project: {
          category: "$_id",
          totalQuantity: 1,
          itemCount: 1,
          items: 1,
          percentage: {
            $multiply: [
              { $divide: ["$totalQuantity", { $sum: "$totalQuantity" }] },
              100
            ]
          }
        }
      }
    ]);

    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get daily donation summaries
router.get('/daily-summary', auth, async (req, res) => {
  try {
    const restaurantId = req.user.restaurantId;
    const date = req.query.date || new Date();

    const summary = await Donation.aggregate([
      {
        $match: {
          restaurantId,
          createdAt: {
            $gte: new Date(new Date(date).setHours(0, 0, 0)),
            $lt: new Date(new Date(date).setHours(23, 59, 59))
          }
        }
      },
      {
        $group: {
          _id: { $hour: "$createdAt" },
          donations: { $push: "$$ROOT" },
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $project: {
          hour: "$_id",
          donations: 1,
          totalQuantity: 1,
          averageQuantity: { $avg: "$donations.quantity" }
        }
      },
      { $sort: { hour: 1 } }
    ]);

    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get cumulative donation stats
router.get('/cumulative-stats', auth, async (req, res) => {
  try {
    const restaurantId = req.user.restaurantId;

    const stats = await Donation.aggregate([
      { $match: { restaurantId } },
      {
        $group: {
          _id: null,
          totalDonations: { $sum: 1 },
          totalQuantity: { $sum: "$quantity" },
          uniqueCategories: { $addToSet: "$category" },
          firstDonation: { $min: "$createdAt" },
          lastDonation: { $max: "$createdAt" }
        }
      }
    ]);

    res.json(stats[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
