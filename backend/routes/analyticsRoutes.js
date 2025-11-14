import express from "express";
import Order from "../models/orderModels.js";
import Robot from "../models/robotModels.js";

const router = express.Router();

// GET /analytics/summary - Hämta sammanfattande statistik
router.get("/summary", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const completedOrders = await Order.countDocuments({ status: "completed" });
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const totalRobots = await Robot.countDocuments();
    const activeRobots = await Robot.countDocuments({ isActive: true });
    const avgOrdersPerRobot = totalOrders / (totalRobots || 1);

    res.json({
      summary: {
        totalOrders,
        completedOrders,
        ordersByStatus,
        totalRobots,
        activeRobots,
        avgOrdersPerRobot,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching analytics", error: err });
  }
});

export default router;
