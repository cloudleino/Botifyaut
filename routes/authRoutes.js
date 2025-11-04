// 📁 routes/authRoutes.js
// ---------------------------------------------------------
// ✅ Unified Auth Routes for all team members (A–E)
// Supports: Manual Register/Login + Google OAuth2 + JWT
// ---------------------------------------------------------

const express = require('express');
const passport = require('passport');
const { register, login } = require('../controllers/authController');
const { createToken } = require('../utils/jwtUtils'); // 🆕 JWT helper
const router = express.Router();

require('../config/passport'); // Ensure GoogleStrategy is loaded

// ---------------------------------------------------------
// 🧩 MANUAL REGISTER & LOGIN (Person A base)
// ---------------------------------------------------------
router.post('/register', register);
router.post('/login', login);

// ---------------------------------------------------------
// 🧩 GOOGLE OAUTH2 LOGIN (Shared by everyone)
// ---------------------------------------------------------
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }) // ✅ Fixed missing 'scope'
);

// ---------------------------------------------------------
// 🧩 GOOGLE CALLBACK (Handles redirect + JWT creation)
// ---------------------------------------------------------
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login-failed' }),
  (req, res) => {
    try {
      // ✅ Generate JWT for logged-in Google user
      const token = createToken(req.user);

      // ✅ Log success to terminal (for team testing)
      console.log(`✅ Google login: ${req.user.email} (${req.user.role})`);

      // ✅ Return same JSON format as Person A manual login
      res.status(200).json({
        success: true,
        message: 'Google login successful!',
        data: {
          token,
          user: {
            id: req.user._id,
            fullname: req.user.fullname,
            email: req.user.email,
            role: req.user.role,
          },
        },
      });
    } catch (err) {
      console.error('❌ Google login error:', err.message);
      res.status(500).json({ success: false, message: 'Error generating token' });
    }
  }
);

// ---------------------------------------------------------
// 🧩 OPTIONAL FAILURE ROUTE
// ---------------------------------------------------------
router.get('/login-failed', (req, res) => {
  res.status(401).json({ success: false, message: 'Google login failed' });
});

module.exports = router;
