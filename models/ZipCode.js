// models/ZipCode.js
const mongoose = require('mongoose');

const zipCodeSchema = new mongoose.Schema({
  code: String,
  supplier: String,
}, { collection: 'Zip codes' });  // Specify the exact collection name

const ZipCode = mongoose.model('ZipCode', zipCodeSchema);

module.exports = ZipCode;
