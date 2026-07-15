import React, { useState } from 'react';
import { parcelAPI } from '../services/api';
import '../styles/TrackPage.css';

const TrackParcelPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [parcel, setParcel] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await parcelAPI.trackParcel(trackingId);
      setParcel(response.data.parcel);
      setHistory(response.data.history);
    } catch (err) {
      setError(err.response?.data?.message || 'Parcel not found');
      setParcel(null);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-container">
      <div className="track-card">
        <h1>Track Your Parcel</h1>

        <form onSubmit={handleTrack}>
          <div className="track-input">
            <input
              type="number"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Parcel ID"
              required
            />
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Tracking...' : 'Track'}
            </button>
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}

        {parcel && (
          <div className="parcel-details">
            <h2>Parcel Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <label>Tracking ID:</label>
                <span>#{parcel.id}</span>
              </div>
              <div className="detail-item">
                <label>Status:</label>
                <span className={`status status-${parcel.status}`}>{parcel.status.toUpperCase()}</span>
              </div>
              <div className="detail-item">
                <label>Recipient:</label>
                <span>{parcel.recipient_name}</span>
              </div>
              <div className="detail-item">
                <label>Delivery Address:</label>
                <span>{parcel.delivery_address}</span>
              </div>
            </div>

            {history.length > 0 && (
              <div className="delivery-history">
                <h3>Delivery History</h3>
                <div className="timeline">
                  {history.map((item, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <h4>{item.status}</h4>
                        {item.location && <p>{item.location}</p>}
                        {item.notes && <p>{item.notes}</p>}
                        <small>{new Date(item.updated_at).toLocaleString()}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackParcelPage;
