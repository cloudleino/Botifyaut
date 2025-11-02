const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET alla
router.get('/', async (req,res) => {
  const data = await User.find().lean();
  res.json(data);
});

// POST skapa
router.post('/', async (req,res) => {
  const created = await User.create(req.body);
  res.status(201).json(created);
});

module.exports = router;
