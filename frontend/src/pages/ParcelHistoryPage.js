import React, { useState, useEffect } from 'react';
import { parcelAPI } from '../services/api';
import '../styles/HistoryPage.css';

const ParcelHistoryPage = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const response = await parcelAPI.getMyParcels();
      setParcels(response.data.parcels);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching parcels');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="history-container">
      <h1>Parcel History</h1>

      {error && <div className="error-message">{error}</div>}

      {parcels.length === 0 ? (
        <div className="no-parcels">
          <p>No parcels found</p>
        </div>
      ) : (
        <div className="parcels-list">
          {parcels.map(parcel => (
            <div key={parcel.id} className="parcel-card">
              <div className="parcel-header">
                <h3>Parcel #{parcel.id}</h3>
                <span className={`status status-${parcel.status}`}>{parcel.status}</span>
              </div>
              <div className="parcel-info">
                <p><strong>Recipient:</strong> {parcel.recipient_name}</p>
                <p><strong>Address:</strong> {parcel.delivery_address}</p>
                <p><strong>Weight:</strong> {parcel.weight} kg</p>
                <p><strong>Date:</strong> {new Date(parcel.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParcelHistoryPage;
