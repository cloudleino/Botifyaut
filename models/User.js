// server/routes/users.js
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

// Hjälp: ta bort password innan vi skickar svar
const sanitize = (u) => {
  const obj = u.toObject ? u.toObject() : u;
  delete obj.password;
  return obj;
};

// GET: lista alla (endast manager/admin)
router.get("/", requireAuth, requireRole("manager", "admin"), async (req, res) => {
  const users = await User.find().lean();
  users.forEach(u => delete u.password);
  res.json(users);
});

// GET: den inloggade användaren
router.get("/me", requireAuth, async (req, res) => {
  const me = await User.findById(req.user.sub);
  if (!me) return res.status(404).json({ error: "User not found" });
  res.json(sanitize(me));
});

// POST: skapa ny användare (manager/admin)
router.post("/", requireAuth, requireRole("manager", "admin"), async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  const roles = ["user", "cook", "robot", "manager", "admin"];
  if (!roles.includes(role)) return res.status(400).json({ error: "Ogiltig roll" });
  if (!email || !password) return res.status(400).json({ error: "Email och password krävs" });

  const hash = await bcrypt.hash(password, 10);
  const created = await User.create({ name, email, password: hash, role });
  res.status(201).json(sanitize(created));
});

// PUT: uppdatera användare (manager/admin)
router.put("/:id", requireAuth, requireRole("manager", "admin"), async (req, res) => {
  const { password, role, ...rest } = req.body;
  const update = { ...rest };

  if (role) {
    const roles = ["user", "cook", "robot", "manager", "admin"];
    if (!roles.includes(role)) return res.status(400).json({ error: "Ogiltig roll" });
    update.role = role;
  }

  if (password) update.password = await bcrypt.hash(password, 10);
  const updated = await User.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!updated) return res.status(404).json({ error: "User not found" });
  res.json(sanitize(updated));
});

// DELETE: ta bort (manager/admin)
router.delete("/:id", requireAuth, requireRole("manager", "admin"), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
