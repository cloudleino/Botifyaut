const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/authController');
require('../config/passport');

// Manual register & login
router.post('/register', register);
router.post('/login', login);

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login-failed' }),
  (req, res) => {
    try {

      //gr8 jwt token for the logged in google user
      const token = jwt.sign(
        { id: req.user._id, role: req.user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Google login successful!',
        token,
        user: {
          id: req.user._id,
          fullname: req.user.fullname,
          email: req.user.email,
          role: req.user.role,
        },
      });
    } catch (err) {
      res.status(500).json({ message: 'Error generating token', error: err.message });
    }
  }
);

// Optional failure route
router.get('/login-failed', (req, res) => {
  res.status(401).json({ message: 'Google login failed' });
});

module.exports = router;
