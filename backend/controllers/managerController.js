// controllers/managerController.js
// ===============================================
// 💼 Manager Controller – operations, stats & CRUD
// ===============================================

const Robot = require('../models/robotModels');
const User = require('../models/userModels');
const Order = require('../models/orderModels');

// ✅ GET /api/manager/overview
// Returnerar enkel översikt: antal ordrar, robotar, användare
exports.getOverview = async (req, res) => {
  try {
    const [orders, robots, users] = await Promise.all([
      Order.countDocuments(),
      Robot.countDocuments(),
      User.countDocuments(),
    ]);

    res.json({ orders, robots, users });
  } catch (err) {
    console.error('❌ Manager overview error:', err);
    res.status(500).json({ message: 'Server error: overview' });
  }
};

// ✅ GET /api/manager/robots
// Hämtar alla robotar
exports.getRobots = async (req, res) => {
  try {
    const robots = await Robot.find().sort({ createdAt: -1 });
    res.json(robots);
  } catch (err) {
    console.error('❌ Get robots error:', err);
    res.status(500).json({ message: 'Server error: getRobots' });
  }
};

// ✅ POST /api/manager/robots
// Skapar en ny robot
exports.createRobot = async (req, res) => {
  try {
    const { name, model, status = 'idle' } = req.body;
    if (!name || !model) {
      return res.status(400).json({ message: 'Name and model are required' });
    }

    const robot = await Robot.create({ name, model, status });
    res.status(201).json(robot);
  } catch (err) {
    console.error('❌ Create robot error:', err);
    res.status(500).json({ message: 'Server error: createRobot' });
  }
};

// ✅ PATCH /api/manager/robots/:id
// Uppdaterar en robot (t.ex. status)
exports.updateRobot = async (req, res) => {
  try {
    const updated = await Robot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Robot not found' });
    res.json(updated);
  } catch (err) {
    console.error('❌ Update robot error:', err);
    res.status(500).json({ message: 'Server error: updateRobot' });
  }
};

// ✅ DELETE /api/manager/robots/:id
// Tar bort en robot
exports.deleteRobot = async (req, res) => {
  try {
    const robot = await Robot.findById(req.params.id);
    if (!robot) return res.status(404).json({ message: 'Robot not found' });
    await robot.deleteOne();
    res.status(204).end();
  } catch (err) {
    console.error('❌ Delete robot error:', err);
    res.status(500).json({ message: 'Server error: deleteRobot' });
  }
};
