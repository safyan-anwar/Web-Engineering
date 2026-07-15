import React, { useState, useEffect } from 'react';
import { agentAPI } from '../services/api';
import '../styles/AgentDashboard.css';

const AgentDashboard = () => {
  const [stats, setStats] = useState({
    assigned: 0,
    inTransit: 0,
    delivered: 0
  });
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignedParcels();
  }, []);

  const fetchAssignedParcels = async () => {
    try {
      const response = await agentAPI.getAssignedParcels();
      setParcels(response.data.parcels);

      // Calculate stats
      const assigned = response.data.parcels.filter(p => p.status === 'assigned').length;
      const inTransit = response.data.parcels.filter(p => p.status === 'in_transit').length;
      const delivered = response.data.parcels.filter(p => p.status === 'delivered').length;

      setStats({ assigned, inTransit, delivered });
    } catch (error) {
      console.error('Error fetching parcels:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="agent-dashboard">
      <h1>Agent Dashboard</h1>

      <div className="stats-grid agent-stats">
        <div className="stat-card">
          <h3>Assigned Parcels</h3>
          <p className="stat-number">{stats.assigned}</p>
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
        <h2>Recent Deliveries</h2>
        {parcels.length === 0 ? (
          <p>No parcels assigned yet</p>
        ) : (
          <div className="parcels-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Recipient</th>
                  <th>Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {parcels.slice(0, 5).map(parcel => (
                  <tr key={parcel.id}>
                    <td>#{parcel.id}</td>
                    <td>{parcel.recipient_name}</td>
                    <td>{parcel.delivery_address}</td>
                    <td><span className={`status status-${parcel.status}`}>{parcel.status}</span></td>
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

export default AgentDashboard;
