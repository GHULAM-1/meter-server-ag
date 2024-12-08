// routes/rateOrderHistory.js
const express = require('express');
const RateOrderHistory = require('../models/RateOrderHistory'); // Import the model

const router = express.Router();

// 1. Get all rate order history records
router.get('/', async (req, res) => {
  try {
    const rateOrders = await RateOrderHistory.find();
    res.json(rateOrders); // Respond with all documents from the collection
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
