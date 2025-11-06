// 📁 routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/orderModels');

// ✅ Import middlewares
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

// ✅ Create a new order (any logged-in user)
router.post('/', protect, async (req, res) => {
  try {
    const order = new Order({
      userId: req.user.id,
      items: req.body.items,
    });

    await order.save();

    // Notify real-time listeners (if socket is used)
    if (req.io) {
      req.io.emit('newOrder', order);
    }

    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (err) {
    res.status(400).json({ message: 'Error creating order', error: err.message });
  }
});

// ✅ Get all orders (admin / manager / cooker)
router.get('/', protect, requireRole(['admin', 'manager', 'cooker']), async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'fullname email role');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

// ✅ Get single order by ID (admin / manager / cooker)
router.get('/:id', protect, requireRole(['admin', 'manager', 'cooker']), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'fullname email role');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order', error: err.message });
  }
});

// ✅ Update order status (manager / cooker)
router.put('/:id/status', protect, requireRole(['manager', 'cooker']), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;
    await order.save();

    if (req.io) {
      req.io.emit('orderUpdated', order);
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      order,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating order', error: err.message });
  }
});

// ✅ Delete an order (admin only)
router.delete('/:id', protect, requireRole(['admin']), async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting order', error: err.message });
  }
});

module.exports = router;
