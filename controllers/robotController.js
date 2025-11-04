const Robot = require('../models/robotModels');
const { broadcastRobotUpdate } = require('../socket');

exports.getRobots = async (req, res) => {
    const robots = await Robot.find();
    res.json({ success: true, data: robots });
};

exports.createRobot = async (req, res) => {
    const robot = new Robot(req.body);
    await robot.save();
    res.status(201).json({ success: true, data: robot });
};

exports.updateRobot = async (req, res) => {
    const robot = await Robot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!robot) return res.status(404).json({ message: 'Robot not found' });
    broadcastRobotUpdate(robot);
    res.json({ success: true, data: robot });
};

exports.deleteRobot = async (req, res) => {
    await Robot.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Robot deleted' });
};