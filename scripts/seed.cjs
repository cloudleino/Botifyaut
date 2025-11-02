const mongoose = require("mongoose");
const User = require("../models/User");
const Order = require("../models/Order");
const Robot = require("../models/Robot");

(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/botify", { dbName: "botify" });
    console.log("✅ Ansluten till MongoDB");

    // Rensa gamla data
    await Promise.all([User.deleteMany(), Order.deleteMany(), Robot.deleteMany()]);

    // Lägg till testdata
    await User.create([{ name: "Elijah", email: "elijah@botify.se", role: "admin" }]);
    await Order.create([{ product: "Latte", price: 45, status: "DONE" }]);
    await Robot.create([{ name: "PomBot", status: "ACTIVE" }]);

    console.log("✅ Seed klart – databasen har testdata!");
  } catch (err) {
    console.error("❌ Fel vid seedning:", err);
  } finally {
    process.exit(0);
  }
})();
