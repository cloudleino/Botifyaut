// server/server.cjs
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // <-- flyttad upp (måste deklareras innan användning)

// Importera routes
const Users = require("./routes/users");   // rätt namn och rätt sökväg
const Orders = require("./routes/orders");
const Robots = require("./routes/robots");
const Analytics = require("./routes/analytics");
// const Auth = require("./routes/authRoutes"); // aktivera senare för VG

// Middleware
app.use(express.json());
app.use(cors());

// API-routes
app.use("/api/users", Users);
app.use("/api/orders", Orders);
app.use("/api/robots", Robots);
app.use("/api/analytics", Analytics);
// app.use("/api/auth", Auth); // kommenterad tills authRoutes finns

// Hälsokoll
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "botify-api",
    time: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB ansluten");
    app.listen(PORT, () => console.log(`🚀 Servern körs på port ${PORT}`));
  })
  .catch((err) => console.error("❌ Fel vid MongoDB-anslutning:", err.message));
