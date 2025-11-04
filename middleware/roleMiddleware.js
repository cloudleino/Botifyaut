// 📁 middleware/roleMiddleware.js
// -----------------------------------------
// 🔐 Universal Role Authorization Middleware
// Works for both Person A (authorizeRoles)
// and Person B (requireRole)
// -----------------------------------------

/**
 * Person A style:
 *   authorizeRoles('admin', 'manager')
 *
 * Person B style:
 *   requireRole(['admin', 'manager'])
 */

// ✅ Original version (Person A)
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role;

    // Make sure role exists on the user
    if (!userRole) {
      return res.status(401).json({ message: 'Unauthorized: No role found for user' });
    }

    // If user's role not in allowedRoles → deny access
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Continue if authorized
    next();
  };
}

// ✅ New alias (Person B)
const requireRole = (rolesArray = []) => authorizeRoles(...rolesArray);

// ✅ Export both versions so all routes keep working
module.exports = { authorizeRoles, requireRole };
