const express = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

const router = express.Router();

// === 1️⃣ SUMMARY ===
router.get("/summary", async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalRevenueAgg = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);
        const totalRevenue = totalRevenueAgg[0]?.total || 0;
        const totalProducts = await Product.countDocuments();

        res.json({
            orders: totalOrders,
            users: totalUsers,
            revenue: totalRevenue,
            products: totalProducts
        });
    } catch (error) {
        console.error("Summary Error:", error);
        res.status(500).json({ message: "Serverfel i summary" });
    }
});

// === 2️⃣ TIMESERIES ===
router.get("/timeseries", async (req, res) => {
    const range = req.query.range === "30d" ? 30 : 7;
    const since = new Date();
    since.setDate(since.getDate() - range);

    try {
        const data = await Order.aggregate([
            { $match: { createdAt: { $gte: since } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    value: { $sum: "$totalPrice" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(data);
    } catch (error) {
        console.error("Timeseries Error:", error);
        res.status(500).json({ message: "Serverfel i timeseries" });
    }
});

module.exports = router; //
