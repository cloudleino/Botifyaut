// server/server.cjs
// ======================================================
// BOTIFY API — Express + MongoDB (CommonJS)
// ======================================================

// 1) Miljövariabler (.env i mappen /server)
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

// 2) Importer
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 3) Routes (se till att dessa filer exporterar `module.exports = router`)
const usersRoutes  = require("../routes/users");   // ./routes/users.js
const ordersRoutes = require("../routes/orders");  // ./routes/orders.js
const robotsRoutes = require("../routes/robots");  // ./routes/robots.js
// Ev. senare:
// const analyticsRoutes = require("../routes/analytics");
// const authRoutes      = require("../routes/authRoutes");

// 4) App & middleware
const app = express();
app.use(cors());
app.use(express.json());

// 5) Hälsokontroll
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "botify-api", time: new Date().toISOString() });
});

// 6) API-mounts
app.use("/api/users",  usersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/robots", robotsRoutes);

// 7) Root (valfritt)
app.get("/", (_req, res) => res.send("Botify API körs"));

// 8) DB-anslutning
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/botify";
mongoose
  .connect(MONGO_URI, { dbName: "botify" })
  .then(() => {
    console.log("✅ MongoDB ansluten:", MONGO_URI);

    // Exempel: skapa en test-collection första gången (ofarligt)
    const testSchema = new mongoose.Schema({ name: String }, { collection: "tests" });
    const Test = mongoose.model("Test", testSchema);
    Test.findOne().then(doc => {
      if (!doc) {
        new Test({ name: "Första roboten" }).save().then(() => {
          console.log("🧪 Test-dokument skapat i 'tests'");
        });
      }
    });
  })
  .catch(err => {
    console.error("❌ Fel vid MongoDB-anslutning:", err.message);
    process.exit(1);
  });

// 9) Enkla felhanterare
app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.originalUrl });
});
app.use((err, _req, res, _next) => {
  console.error("⚠️  Serverfel:", err);
  res.status(500).json({ error: "Server error" });
});

// 10) Starta servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servern körs på port ${PORT}`);
});
