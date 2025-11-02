const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET alla
router.get('/', async (req, res) => {
  const data = await User.find().lean();
  res.json(data);
});

// POST skapa
router.post('/', async (req, res) => {
  const created = await User.create(req.body);
  res.status(201).json(created);
});

// PUT – uppdatera
router.put('/:id', async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE – ta bort
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User borttagen' });
});

module.exports = router;
