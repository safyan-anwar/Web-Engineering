import React, { useState, useEffect } from 'react';
import { parcelAPI } from '../services/api';
import '../styles/Dashboard.css';

const UserDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    delivered: 0,
    inTransit: 0
  });
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const response = await parcelAPI.getMyParcels();
      setParcels(response.data.parcels);
      
      // Calculate stats
      const total = response.data.parcels.length;
      const pending = response.data.parcels.filter(p => p.status === 'pending').length;
      const delivered = response.data.parcels.filter(p => p.status === 'delivered').length;
      const inTransit = response.data.parcels.filter(p => p.status === 'in_transit').length;

      setStats({ total, pending, delivered, inTransit });
    } catch (error) {
      console.error('Error fetching parcels:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name}!</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Parcels</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number">{stats.pending}</p>
        </div>
        <div className="stat-card">
          <h3>In Transit</h3>
          <p className="stat-number">{stats.inTransit}</p>
        </div>
        <div className="stat-card">
          <h3>Delivered</h3>
          <p className="stat-number">{stats.delivered}</p>
        </div>
      </div>

      <div className="recent-parcels">
        <h2>Recent Parcels</h2>
        {parcels.length === 0 ? (
          <p>No parcels found. <a href="/create-parcel">Create one now</a></p>
        ) : (
          <div className="parcels-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Recipient</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {parcels.slice(0, 5).map(parcel => (
                  <tr key={parcel.id}>
                    <td>#{parcel.id}</td>
                    <td>{parcel.recipient_name}</td>
                    <td><span className={`status status-${parcel.status}`}>{parcel.status}</span></td>
                    <td>{new Date(parcel.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
