// models/RateOrderHistory.js
const mongoose = require('mongoose');

// Define the schema for the "Rate order history" collection
const rateOrderHistorySchema = new mongoose.Schema(
  {
    date: {
      type: String,  // Assuming date will be stored as a string (you can use Date type if needed)
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
    expiration: {
      type: String, // You can use Date type if expiration is meant to be a date field
      required: true,
    },
  },
  { collection: 'Rate order history' } // Specify collection name explicitly
);

// Create the model
const RateOrderHistory = mongoose.model('RateOrderHistory', rateOrderHistorySchema);

// Export the model
module.exports = RateOrderHistory;
