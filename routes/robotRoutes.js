const express = require('express');
const { getRobots, createRobot, updateRobot, deleteRobot } = require('../controllers/robotController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyRole } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', verifyToken, verifyRole(['MANAGER', 'ADMIN']), getRobots);
router.post('/', verifyToken, verifyRole(['MANAGER', 'ADMIN']), createRobot);
router.put('/:id', verifyToken, verifyRole(['MANAGER', 'ADMIN']), updateRobot);
router.delete('/:id', verifyToken, verifyRole(['MANAGER', 'ADMIN']), deleteRobot);

module.exports = router;