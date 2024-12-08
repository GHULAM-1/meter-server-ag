// models/RateToCompare.js
const mongoose = require('mongoose');

// Define the schema for RateToCompare
const rateToCompareSchema = new mongoose.Schema(
  {
    value: { type: String, required: true }, // The rate value
  },
  { collection: 'Rate to compare' } // Define the collection name
);

// Export the model based on the schema
module.exports = mongoose.model('RateToCompare', rateToCompareSchema);
