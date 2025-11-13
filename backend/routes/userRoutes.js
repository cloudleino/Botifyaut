const express = require("express");
const router = express.Router();
const User = require("../models/userModels");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// ✅ Create a new user (Admin + Manager)
router.post("/", protect, authorizeRoles("admin", "manager"), async (req, res) => {
  try {
    const { username, fullname, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({
      username,
      fullname,
      email,
      password,
      role: role || "user",
    });

    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get all users (Admin + Manager)
router.get("/", protect, authorizeRoles("admin", "manager"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get user by ID (Admin + Manager)
router.get("/:id", protect, authorizeRoles("admin", "manager"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Update user (Admin + Manager)
router.put("/:id", protect, authorizeRoles("admin", "manager"), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select(
      "-password"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Delete user (Admin + Manager)
router.delete("/:id", protect, authorizeRoles("admin", "manager"), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
