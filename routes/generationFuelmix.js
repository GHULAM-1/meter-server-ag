// routes/generationFuelMix.js
const express = require('express');
const GenerationFuelMix = require('../models/GenerationFuelMix'); // Import the correct model for "GenerationFuelMix"
const router = express.Router();

// Route to get Generation Fuel Mix data
router.get('/', async (req, res) => {
  try {
    // Fetch all documents from the "Generation Fuel Mix" collection
    const fuelMixData = await GenerationFuelMix.find();

    if (!fuelMixData || fuelMixData.length === 0) {
      return res.status(404).json({ message: 'No fuel mix data found' });
    }

    // Return the fetched data
    res.json(fuelMixData);
  } catch (error) {
    console.error('Error fetching Generation Fuel Mix data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
