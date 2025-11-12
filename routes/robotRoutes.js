// routes/robotRoutes.js
const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middleware/authMiddleware');   // alias verifyToken finns också
const { requireRole } = require('../middleware/roleMiddleware');   // alias verifyRole finns också
const ctrl = require('../controllers/robotController');

// Alla robot-endpoints kräver auth + admin/manager
router.use(requireAuth, requireRole(['admin', 'manager']));

// CRUD-endpoints
router.get('/',        ctrl.getRobots);
router.post('/',       ctrl.createRobot);
router.put('/:id',     ctrl.updateRobot);
router.delete('/:id',  ctrl.deleteRobot);

// ✅ Endast denna rad behövs
module.exports = router;


