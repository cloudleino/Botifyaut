const express = require('express');
const router = express.Router();
const Robot = require('../models/Robot');

// GET alla
router.get('/', async (req, res) => {
  const data = await Robot.find().lean();
  res.json(data);
});

// POST skapa
router.post('/', async (req, res) => {
  const created = await Robot.create(req.body);
  res.status(201).json(created);
});

// PUT – uppdatera
router.put('/:id', async (req, res) => {
  const updated = await Robot.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE – ta bort
router.delete('/:id', async (req, res) => {
  await Robot.findByIdAndDelete(req.params.id);
  res.json({ message: 'Robot borttagen' });
});

module.exports = router;
