// routes/managerRoutes.js
const express = require('express');
const router = express.Router();

const managerCtrl = require('../controllers/managerController');
const Robot = require('../models/robotModels');
const Order = require('../models/orderModels');
const User  = require('../models/userModels');

const { requireAuth } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

// 🔐 Allt under /api/manager kräver inlogg + manager|admin
router.use(requireAuth, requireRole(['manager', 'admin']));

/**
 * GET /api/manager/overview
 * Dashboard-statistik
 */
router.get('/overview', managerCtrl.getOverview);

/**
 * GET /api/manager/robots
 * ?status=active|idle (valfritt filter)
 */
router.get('/robots', async (req, res) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;

    const robots = await Robot.find(query).sort({ createdAt: -1 });
    return res.json(robots);
  } catch (err) {
    console.error('GET /robots error:', err);
    return res.status(500).json({ message: 'Failed to load robots' });
  }
});

/**
 * POST /api/manager/robots
 * Skapa robot
 */
router.post('/robots', async (req, res) => {
  try {
    const { name, model, status = 'idle' } = req.body;
    if (!name || !model) {
      return res.status(400).json({ message: 'Name and model are required' });
    }
    const robot = await Robot.create({ name, model, status });
    return res.status(201).json(robot);
  } catch (err) {
    console.error('POST /robots error:', err);
    return res.status(400).json({ message: 'Create robot failed' });
  }
});

/**
 * PATCH /api/manager/robots/:id
 * Uppdatera whitelisted fält
 */
router.patch('/robots/:id', async (req, res) => {
  try {
    const allowed = ['name', 'model', 'status'];
    const payload = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => allowed.includes(k))
    );

    const updated = await Robot.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!updated) return res.status(404).json({ message: 'Robot not found' });
    return res.json(updated);
  } catch (err) {
    console.error('PATCH /robots/:id error:', err);
    return res.status(400).json({ message: 'Update failed' });
  }
});

/**
 * DELETE /api/manager/robots/:id
 * Ta bort robot
 */
router.delete('/robots/:id', async (req, res) => {
  try {
    const existing = await Robot.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Robot not found' });
    await existing.deleteOne();
    return res.status(204).end();
  } catch (err) {
    console.error('DELETE /robots/:id error:', err);
    return res.status(400).json({ message: 'Delete failed' });
  }
});

/**
 * (Valfritt) Assign robot → order
 * POST /api/manager/orders/:orderId/assign-robot
 */
router.post('/orders/:orderId/assign-robot', async (req, res) => {
  try {
    const { robotId } = req.body;

    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const robot = await Robot.findById(robotId);
    if (!robot) return res.status(404).json({ message: 'Robot not found' });

    order.assignedRobot = robot._id;
    await order.save();

    // Om du även vill spegla på robot:
    // robot.assignedOrder = order._id;
    // await robot.save();

    return res.json({ ok: true, orderId: order._id, robotId: robot._id });
  } catch (err) {
    console.error('POST /orders/:orderId/assign-robot error:', err);
    return res.status(400).json({ message: 'Assignment failed' });
  }
});

module.exports = router;
