import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalParcels: 0,
    totalUsers: 0,
    totalAgents: 0,
    pendingParcels: 0,
    deliveredParcels: 0,
    inTransitParcels: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="stats-grid admin-stats">
        <div className="stat-card">
          <h3>Total Parcels</h3>
          <p className="stat-number">{stats.totalParcels}</p>
        </div>
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Agents</h3>
          <p className="stat-number">{stats.totalAgents}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Parcels</h3>
          <p className="stat-number">{stats.pendingParcels}</p>
        </div>
        <div className="stat-card">
          <h3>In Transit</h3>
          <p className="stat-number">{stats.inTransitParcels}</p>
        </div>
        <div className="stat-card">
          <h3>Delivered</h3>
          <p className="stat-number">{stats.deliveredParcels}</p>
        </div>
      </div>

      <div className="admin-actions">
        <a href="/admin/manage-users" className="action-btn">Manage Users</a>
        <a href="/admin/manage-parcels" className="action-btn">Manage Parcels</a>
      </div>
    </div>
  );
};

export default AdminDashboard;
