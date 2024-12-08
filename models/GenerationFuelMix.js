// models/GenerationFuelMix.js
const mongoose = require('mongoose');

const generationFuelMixSchema = new mongoose.Schema(
    {
      label: { type: String, required: true },
      value: { type: Number, required: true },
    },
    { collection: 'Generation Fuel mix' } // Explicitly specify the collection name
  );
  
  module.exports = mongoose.model('GenerationFuelMix', generationFuelMixSchema);
  
