const express = require('express');
const router = express.Router();
const MonthlyElectricUsage = require('../models/MonthlyElectricUsage'); // Import the schema model

// GET route to fetch all monthly electric usage data
router.get('/', async (req, res) => {
  try {
    const usageData = await MonthlyElectricUsage.find();  // Fetch all usage data from the database
    res.json(usageData);  // Return the data as JSON
  } catch (error) {
    console.error('Error fetching electric usage data:', error);
    res.status(500).json({ message: 'Error fetching data' });  // Error response
  }
});


module.exports = router;
