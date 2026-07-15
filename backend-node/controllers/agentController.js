const DeliveryAgent = require('../models/DeliveryAgent');
const User = require('../models/User');

exports.registerAgent = async (req, res) => {
  try {
    const { name, email, password, phone, vehicle_type, license_number, address } = req.body;

    if (!name || !email || !password || !vehicle_type || !license_number) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // First, create user with agent role
    const result = User.create({
      name,
      email,
      password,
      phone,
      role: 'agent',
      address: address || ''
    });

    // Then create agent record
    const agent = DeliveryAgent.create({
      user_id: result.insertId,
      vehicle_type,
      license_number,
      is_available: true
    });

    res.status(201).json({ message: 'Agent registered successfully', agentId: agent.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error registering agent', error: error.message });
  }
};

exports.getAssignedParcels = async (req, res) => {
  try {
    const agentId = req.user.id;
    const parcels = DeliveryAgent.getAssignedParcels(agentId);
    res.json({ parcels });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assigned parcels', error: error.message });
  }
};

exports.updateParcelStatus = async (req, res) => {
  try {
    const { status, location, notes } = req.body;
    const parcelId = req.params.id;

    // Use the same logic as in parcelController
    const Parcel = require('../models/Parcel');
    const DeliveryHistory = require('../models/DeliveryHistory');

    const parcel = Parcel.findById(parcelId);
    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    // Get agent record using user ID
    const agent = DeliveryAgent.findById(req.user.id);
    const agentId = agent ? agent.id : req.user.id;

    Parcel.updateStatus(parcelId, status);
    DeliveryHistory.create({
      parcel_id: parcelId,
      agent_id: agentId,
      status,
      location: location || '',
      notes: notes || ''
    });

    res.json({ message: 'Parcel status updated successfully' });
  } catch (error) {
    console.error('Error updating parcel:', error);
    res.status(500).json({ message: 'Error updating parcel', error: error.message });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const { is_available } = req.body;
    DeliveryAgent.updateAvailability(req.user.id, is_available);
    res.json({ message: 'Availability updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating availability', error: error.message });
  }
};
