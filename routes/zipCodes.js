// routes/zipCodes.js
const express = require('express');
const ZipCode = require('../models/ZipCode');  // Import the correct model
const router = express.Router();

// Route to get Zip Code by its value
router.get('/:zipCode', async (req, res) => {
  try {
    const { zipCode } = req.params;

    // Log to see the zip code being passed
    console.log('Searching for zip code:', zipCode);

    // Find entry by zip code (case-insensitive search)
    const zipEntry = await ZipCode.find({ code: zipCode });

    // Check if the zip entry is found
    if (!zipEntry) {
      return res.status(404).json({ message: 'Zip code not found' });
    }

    // Log the found zip entry for debugging
    console.log('Found Zip Entry:', zipEntry);

    // Return the matching zip code entry
    res.json(zipEntry);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
