const mongoose = require('mongoose');

// Define the schema for Monthly Electric Usage
const monthlyElectricUsageSchema = new mongoose.Schema(
  {
    month: { type: String, required: true },  // Name of the month
    usage: { type: Number, required: true },  // Electric usage for the month
  },
  { collection: 'Monthly electric usage' }  // Explicitly specify the collection name
);

// Create a model from the schema
const MonthlyElectricUsage = mongoose.model('MonthlyElectricUsage', monthlyElectricUsageSchema);

module.exports = MonthlyElectricUsage;
