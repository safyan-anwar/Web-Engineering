const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/authMiddleware');

router.get('/users', verifyAdmin, adminController.getAllUsers);
router.delete('/users/:id', verifyAdmin, adminController.deleteUser);
router.get('/parcels', verifyAdmin, adminController.getAllParcels);
router.get('/parcels/status/:status', verifyAdmin, adminController.getParcelsByStatus);
router.post('/parcels/:id/assign', verifyAdmin, adminController.assignParcelToAgent);
router.get('/stats', verifyAdmin, adminController.getDashboardStats);

module.exports = router;
