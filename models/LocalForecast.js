// models/LocalForecast.js
const mongoose = require('mongoose');

// Define the schema for Local Forecast
const localForecastSchema = new mongoose.Schema(
  {
    time: { type: String, required: true },
    forest: { type: Number, required: true },
    current: { type: Number, required: true },
    generation: { type: Number, required: true },
  },
  { collection: 'Local forecast' } // Explicitly specify the collection name
);

// Export the model
module.exports = mongoose.model('LocalForecast', localForecastSchema);
