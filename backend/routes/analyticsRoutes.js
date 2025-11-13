import express from "express";
import Order from "../models/orderModels.js";
import Robot from "../models/robotModels.js";
const router = express.Router();

// Hämta enkel statistik
router.get("/", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRobots = await Robot.countDocuments();
    const avgOrdersPerRobot = totalOrders / (totalRobots || 1);

    res.json({
      totalOrders,
      totalRobots,
      avgOrdersPerRobot,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching analytics", error: err });
  }
});

export default router;