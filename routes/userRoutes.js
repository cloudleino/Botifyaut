const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userControllers');

// CRUD routes
/*router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser); */

const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Protect all CRUD routes
// Only ADMIN and MANAGER can perform these actions

router.post('/', verifyToken, authorizeRoles('admin', 'manager'), createUser);
router.get('/', verifyToken, authorizeRoles('admin', 'manager'), getUsers);
router.get('/:id', verifyToken, authorizeRoles('admin', 'manager'), getUserById);
router.put('/:id', verifyToken, authorizeRoles('admin', 'manager'), updateUser);
router.delete('/:id', verifyToken, authorizeRoles('admin', 'manager'), deleteUser);

module.exports = router;
