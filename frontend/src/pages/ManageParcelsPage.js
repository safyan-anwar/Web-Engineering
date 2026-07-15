import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import '../styles/ManageParcels.css';

const ManageParcelsPage = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [agentId, setAgentId] = useState('');

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const response = await adminAPI.getAllParcels();
      setParcels(response.data.parcels);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching parcels');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignAgent = async (parcelId) => {
    if (!agentId) {
      alert('Please enter an agent ID');
      return;
    }

    try {
      await adminAPI.assignParcelToAgent(parcelId, { agent_id: agentId });
      alert('Parcel assigned successfully');
      setAgentId('');
      setSelectedParcel(null);
      fetchParcels();
    } catch (err) {
      alert(err.response?.data?.message || 'Error assigning parcel');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="manage-parcels-container">
      <h1>Manage Parcels</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="parcels-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Recipient</th>
              <th>Address</th>
              <th>Status</th>
              <th>Agent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map(parcel => (
              <tr key={parcel.id}>
                <td>#{parcel.id}</td>
                <td>{parcel.recipient_name}</td>
                <td>{parcel.delivery_address}</td>
                <td><span className={`status status-${parcel.status}`}>{parcel.status}</span></td>
                <td>{parcel.assigned_agent_id || 'Unassigned'}</td>
                <td>
                  <button 
                    onClick={() => setSelectedParcel(parcel.id)}
                    className="btn btn-primary btn-sm"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedParcel && (
        <div className="assign-modal">
          <div className="modal-content">
            <h3>Assign Agent to Parcel #{selectedParcel}</h3>
            <input
              type="number"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
              placeholder="Enter Agent ID"
            />
            <div className="modal-buttons">
              <button onClick={() => handleAssignAgent(selectedParcel)} className="btn btn-primary">Assign</button>
              <button onClick={() => setSelectedParcel(null)} className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageParcelsPage;
