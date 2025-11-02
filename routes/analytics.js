const express = require("express");
const User = require("../models/User");
const Order = require("../models/Order");
const Robot = require("../models/Robot");
const router = express.Router();

router.get("/summary", async (_req, res) => {
  const [users, orders, robots] = await Promise.all([
    User.countDocuments(),
    Order.countDocuments(),
    Robot.countDocuments(),
  ]);
  // Revenue = fiktiv siffra (krav: visa KPI); byt mot riktig logik om ni vill
  const revenue = orders * 250; 
  res.json({ users, orders, robots, revenue });
});

module.exports = router;
