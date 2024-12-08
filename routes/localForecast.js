// routes/localForecastRoute.js
const express = require('express');
const LocalForecast = require('../models/LocalForecast'); // Import the LocalForecast model
const router = express.Router();

// Route to fetch all local forecast data
router.get('/', async (req, res) => {
  try {
    // Fetch all records from the Local forecast collection
    const forecasts = await LocalForecast.find();

    if (!forecasts.length) {
      return res.status(404).json({ message: 'No forecast data found' });
    }

    // Return the forecast data
    res.json(forecasts);
  } catch (error) {
    console.error('Error fetching local forecast data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Export the router
module.exports = router;
