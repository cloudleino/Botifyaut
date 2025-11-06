const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

// ✅ Verify JWT token
exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🪵 Debug log
  console.log("🔍 Incoming Authorization:", authHeader || "❌ No header");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🪵 Debug log
    console.log("✅ Token decoded:", decoded);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      console.log("❌ User not found in database");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("👤 Authenticated user:", req.user.email, req.user.role);

    next();
  } catch (err) {
    console.error("⚠️ Token verification error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Role-based authorization
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("🔐 Checking role:", req.user?.role, "Allowed:", roles);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
