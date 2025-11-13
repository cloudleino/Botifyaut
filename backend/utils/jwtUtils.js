// 📁 utils/jwtUtils.js
// -----------------------------------------
// 🆕 Centralized JWT token creator
// Used by all team members (A–E)
// -----------------------------------------
const jwt = require('jsonwebtoken');

exports.createToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in .env file');
  }

  // 🧠 Create token with user ID and role
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // expires in 1 hour
  );
};
