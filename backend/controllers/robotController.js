const Robot = require('../models/robotModels');

// GET all robots
const getRobots = async (req, res) => {
    try {
        const robots = await Robot.find();
        res.json({ success: true, data: robots });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// POST create a robot
const createRobot = async (req, res) => {
    try {
        const robot = await Robot.create(req.body);
        res.status(201).json({ success: true, data: robot });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// PUT update robot
const updateRobot = async (req, res) => {
    try {
        const robot = await Robot.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: robot });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// DELETE robot
const deleteRobot = async (req, res) => {
    try {
        await Robot.findByIdAndDelete(req.params.id);
        res.json({ success: true, data: null });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { getRobots, createRobot, updateRobot, deleteRobot };
