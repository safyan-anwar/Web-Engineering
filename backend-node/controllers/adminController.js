const User = require('../models/User');
const Parcel = require('../models/Parcel');
const DeliveryAgent = require('../models/DeliveryAgent');

exports.getAllUsers = async (req, res) => {
  try {
    const users = User.getAll();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    User.delete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllParcels = async (req, res) => {
  try {
    const parcels = Parcel.getAll();
    res.status(200).json({ parcels });
  } catch (error) {
    console.error('Get parcels error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.assignParcelToAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const { agent_id } = req.body;

    if (!id || !agent_id) {
      return res.status(400).json({ message: 'Parcel ID and Agent ID are required' });
    }

    const parcel = Parcel.findById(id);
    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    Parcel.assignAgent(id, agent_id);

    res.status(200).json({ message: 'Parcel assigned to agent successfully' });
  } catch (error) {
    console.error('Assign parcel error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getParcelsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const parcels = Parcel.getByStatus(status);
    res.status(200).json({ parcels });
  } catch (error) {
    console.error('Get parcels by status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const allParcels = Parcel.getAll();

    const stats = {
      total_parcels: allParcels.length,
      pending: allParcels.filter(p => p.status === 'pending').length,
      assigned: allParcels.filter(p => p.status === 'assigned').length,
      in_transit: allParcels.filter(p => p.status === 'in_transit').length,
      delivered: allParcels.filter(p => p.status === 'delivered').length,
      cancelled: allParcels.filter(p => p.status === 'cancelled').length
    };

    res.status(200).json({ stats });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
