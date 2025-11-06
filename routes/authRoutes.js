// 📁 routes/authRoutes.js
const express = require("express");
const passport = require("passport");
const { register, login } = require("../controllers/authController");
const { createToken } = require("../utils/jwtUtils");
const router = express.Router();

require("../config/passport"); // make sure this loads the GoogleStrategy

// ---------------------------------------------------------
// 🧩 Manual Login & Register
// ---------------------------------------------------------
router.post("/register", register);
router.post("/login", login);

// ---------------------------------------------------------
// 🧩 Google OAuth Login
// ---------------------------------------------------------
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// ---------------------------------------------------------
// 🧩 Google OAuth Callback — THIS IS THE FIXED VERSION
// ---------------------------------------------------------
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login?error=google-failed",
  }),
  (req, res) => {
    try {
      // ✅ Generate JWT token for user
      const token = createToken(req.user);

      console.log(`✅ Google login: ${req.user.email} (${req.user.role})`);

      // ✅ Redirect user to frontend with token and details in query string
      const redirectUrl = `http://localhost:5173/google-success?token=${token}&role=${req.user.role}&fullname=${encodeURIComponent(
        req.user.fullname
      )}&email=${encodeURIComponent(req.user.email)}`;

      return res.redirect(redirectUrl);
    } catch (err) {
      console.error("❌ Google login error:", err.message);
      return res.redirect("http://localhost:5173/login?error=server");
    }
  }
);

// ---------------------------------------------------------
// 🧩 Failure route (optional)
// ---------------------------------------------------------
router.get("/login-failed", (req, res) => {
  res.status(401).json({ success: false, message: "Google login failed" });
});

// ------------------- LOGOUT -------------------
router.post("/logout", (req, res) => {
  // If you ever store tokens in cookies, this will clear them
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
