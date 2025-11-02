const express = require("express");
const Robot = require("../models/Robot");
const router = express.Router();

router.get("/", async (_req, res) => {
  const robots = await Robot.find().sort({ createdAt: -1 });
  res.json(robots);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const robot = await Robot.create({ name, status: "Active" });
  res.status(201).json(robot);
});

router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;
  const robot = await Robot.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(robot);
});

router.delete("/:id", async (req, res) => {
  await Robot.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
