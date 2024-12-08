// routes/rateToCompare.js
const express = require('express');
const router = express.Router();
const RateToCompare = require('../models/RateToCompare'); // Import the model

// Route to get the rate from the 'Rate to compare' collection
router.get('/', async (req, res) => {
  try {
    const rate = await RateToCompare.findOne(); // Fetch the first document (you can modify this to find a specific one if needed)
    
    if (!rate) {
      return res.status(404).json({ message: 'Rate not found' });
    }

    // Send the rate data as the response
    res.json(rate);
  } catch (err) {
    console.error('Error fetching rate:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
