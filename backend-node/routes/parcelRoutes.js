const express = require('express');
const router = express.Router();
const parcelController = require('../controllers/parcelController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/create', verifyToken, parcelController.createParcel);
router.get('/track/:id', parcelController.trackParcel);
router.get('/my-parcels', verifyToken, parcelController.getMyParcels);
router.get('/:id', verifyToken, parcelController.getParcelById);
router.put('/:id/status', verifyToken, parcelController.updateParcelStatus);
router.delete('/:id', verifyToken, parcelController.deleteParcel);

module.exports = router;
