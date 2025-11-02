const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req,res) => {
  const data = await Order.find().lean();
  res.json(data);
});

router.post('/', async (req,res) => {
  const created = await Order.create(req.body);
  res.status(201).json(created);
});

// PUT – uppdatera order
router.put('/:id', async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE – ta bort order
router.delete('/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order borttagen' });
});

module.exports = router;
