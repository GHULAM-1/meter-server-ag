// routes/supplierRate.js
const express = require('express');
const router = express.Router();
const SupplierRate = require('../models/SupplierRate');

// Route to fetch the supplier rate
router.get('/', async (req, res) => {
  try {
    const supplierRate = await SupplierRate.findOne().sort({ _id: -1 }); // Get the most recent supplier rate
    if (!supplierRate) {
      return res.status(404).json({ message: 'Supplier rate not found' });
    }
    res.json(supplierRate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
