const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const { verifyAgent } = require('../middleware/authMiddleware');

router.post('/register', agentController.registerAgent);
router.get('/parcels', verifyAgent, agentController.getAssignedParcels);
router.put('/parcels/:id/status', verifyAgent, agentController.updateParcelStatus);
router.put('/availability', verifyAgent, agentController.updateAvailability);

module.exports = router;
