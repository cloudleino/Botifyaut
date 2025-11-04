const express = require('express');
const router = express.Router();
const Order = require('../models/orderModels');
const { verifyToken } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware'); // ✅ named import

// Create new order (logged-in user)
router.post('/', verifyToken, async (req, res) => {
  try {
    const order = new Order({
      userId: req.user.id,
      items: req.body.items,
    });
    await order.save();
    req.io.emit('newOrder', order);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all orders (admin / manager / cooker)
router.get('/', verifyToken, requireRole(['admin', 'manager', 'cooker']), async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'username email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status (manager or cooker)
router.put('/:id/status', verifyToken, requireRole(['manager', 'cooker']), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status;
    await order.save();
    req.io.emit('orderUpdated', order);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
