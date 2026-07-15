import React, { useState, useEffect } from 'react';
import { agentAPI } from '../services/api';
import '../styles/AssignedParcels.css';

const AssignedParcelsPage = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState({
    status: 'in_transit',
    location: '',
    notes: ''
  });

  useEffect(() => {
    fetchAssignedParcels();
  }, []);

  const fetchAssignedParcels = async () => {
    try {
      const response = await agentAPI.getAssignedParcels();
      setParcels(response.data.parcels);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching parcels');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (parcelId) => {
    try {
      await agentAPI.updateParcelStatus(parcelId, statusUpdate);
      setStatusUpdate({ status: 'in_transit', location: '', notes: '' });
      setSelectedParcel(null);
      fetchAssignedParcels();
      alert('Status updated successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating status');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="assigned-parcels">
      <h1>Assigned Parcels</h1>

      {error && <div className="error-message">{error}</div>}

      {parcels.length === 0 ? (
        <p>No parcels assigned</p>
      ) : (
        <div className="parcels-list">
          {parcels.map(parcel => (
            <div key={parcel.id} className="parcel-card">
              <div className="parcel-header">
                <h3>Parcel #{parcel.id}</h3>
                <span className={`status status-${parcel.status}`}>{parcel.status}</span>
              </div>
              <div className="parcel-details">
                <p><strong>Recipient:</strong> {parcel.recipient_name}</p>
                <p><strong>Phone:</strong> {parcel.recipient_phone}</p>
                <p><strong>Address:</strong> {parcel.delivery_address}</p>
                <p><strong>Weight:</strong> {parcel.weight} kg</p>
              </div>
              <button
                onClick={() => setSelectedParcel(parcel.id)}
                className="btn btn-primary"
              >
                Update Status
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedParcel && (
        <div className="update-modal">
          <div className="modal-content">
            <h3>Update Parcel #{selectedParcel} Status</h3>
            <div className="form-group">
              <label>Status:</label>
              <select
                value={statusUpdate.status}
                onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
              >
                <option value="in_transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                value={statusUpdate.location}
                onChange={(e) => setStatusUpdate({ ...statusUpdate, location: e.target.value })}
                placeholder="Current location"
              />
            </div>
            <div className="form-group">
              <label>Notes:</label>
              <textarea
                value={statusUpdate.notes}
                onChange={(e) => setStatusUpdate({ ...statusUpdate, notes: e.target.value })}
                placeholder="Additional notes"
              />
            </div>
            <div className="modal-buttons">
              <button onClick={() => handleUpdateStatus(selectedParcel)} className="btn btn-primary">Update</button>
              <button onClick={() => setSelectedParcel(null)} className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedParcelsPage;
