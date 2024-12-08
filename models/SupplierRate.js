// models/SupplierRate.js
const mongoose = require('mongoose');

const supplierRateSchema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    term: { type: String, required: true },
    expiration: { type: String, required: true },
  },
  { collection: 'Supplier rate' } // Collection name in the database
);

module.exports = mongoose.model('SupplierRate', supplierRateSchema);
