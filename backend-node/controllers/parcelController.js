const Parcel = require('../models/Parcel');
const DeliveryHistory = require('../models/DeliveryHistory');

exports.createParcel = async (req, res) => {
  try {
    const { recipient_name, recipient_email, recipient_phone, pickup_address, delivery_address, weight, dimensions, description } = req.body;

    if (!recipient_name || !delivery_address || !recipient_phone) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const parcelData = {
      sender_id: req.user.id,
      recipient_name,
      recipient_email,
      recipient_phone,
      pickup_address,
      delivery_address,
      weight,
      dimensions,
      description,
      status: 'pending'
    };

    const result = Parcel.create(parcelData);

    res.status(201).json({
      message: 'Parcel created successfully',
      parcel_id: result.insertId
    });
  } catch (error) {
    console.error('Create parcel error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getMyParcels = async (req, res) => {
  try {
    const parcels = Parcel.findBySenderId(req.user.id);
    res.status(200).json({ parcels });
  } catch (error) {
    console.error('Get parcels error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getParcelById = async (req, res) => {
  try {
    const { id } = req.params;
    const parcel = Parcel.findById(id);

    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    // Check authorization
    if (parcel.sender_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get delivery history
    const history = DeliveryHistory.getByParcelId(id);

    res.status(200).json({ parcel, history });
  } catch (error) {
    console.error('Get parcel error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.trackParcel = async (req, res) => {
  try {
    const { id } = req.params;
    const parcel = Parcel.findById(id);

    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    const history = DeliveryHistory.getByParcelId(id);

    res.status(200).json({
      parcel: {
        id: parcel.id,
        status: parcel.status,
        recipient_name: parcel.recipient_name,
        delivery_address: parcel.delivery_address,
        created_at: parcel.created_at
      },
      history
    });
  } catch (error) {
    console.error('Track parcel error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateParcelStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location, notes, agent_id } = req.body;

    const parcel = Parcel.findById(id);
    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    Parcel.updateStatus(id, status);

    // Log to delivery history
    if (location || status) {
      DeliveryHistory.create({
        parcel_id: id,
        agent_id: agent_id || req.user.id,
        status,
        location,
        notes
      });
    }

    res.status(200).json({ message: 'Parcel status updated successfully' });
  } catch (error) {
    console.error('Update parcel status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteParcel = async (req, res) => {
  try {
    const { id } = req.params;

    const parcel = Parcel.findById(id);
    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    // Check authorization
    if (parcel.sender_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    Parcel.delete(id);

    res.status(200).json({ message: 'Parcel deleted successfully' });
  } catch (error) {
    console.error('Delete parcel error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
