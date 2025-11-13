// 📁 middleware/roleMiddleware.js
// -----------------------------------------
// 🔐 Universal Role Authorization Middleware
// Compatible with requireRole(), verifyRole(), authorizeRoles()
// -----------------------------------------

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRole = (req.user?.role || '').toLowerCase();
    const allowed = allowedRoles.map(r => String(r).toLowerCase());

    // No role → unauthorized
    if (!userRole) {
      return res.status(401).json({ message: 'Unauthorized: No role found for user' });
    }

    // Role not in allowed list → forbidden
    if (!allowed.includes(userRole)) {
      return res.status(403).json({ message: `Access denied: ${userRole} not allowed` });
    }

    next();
  };
}

// ✅ Aliases for different import styles across your routes
const requireRole = (rolesArray = []) => authorizeRoles(...rolesArray);
const verifyRole  = (rolesArray = []) => authorizeRoles(...rolesArray);

module.exports = { authorizeRoles, requireRole, verifyRole };
