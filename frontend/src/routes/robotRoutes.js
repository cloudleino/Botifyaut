const express = require('express');
const { getRobots, createRobot, updateRobot, deleteRobot } = require('../controllers/robotController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyRole } = require('../middleware/roleMiddleware');

const router = express.Router();

// GET all robots - accessible by MANAGER, ADMIN, ROBOT
router.get('/', verifyToken, verifyRole(['MANAGER','ADMIN','ROBOT']), getRobots);

// POST create robot - accessible by MANAGER, ADMIN, ROBOT
router.post('/', verifyToken, verifyRole(['MANAGER','ADMIN','ROBOT']), createRobot);

// PUT update robot - only MANAGER, ADMIN
router.put('/:id', verifyToken, verifyRole(['MANAGER','ADMIN']), updateRobot);

// DELETE robot - only MANAGER, ADMIN
router.delete('/:id', verifyToken, verifyRole(['MANAGER','ADMIN']), deleteRobot);

module.exports = router;
