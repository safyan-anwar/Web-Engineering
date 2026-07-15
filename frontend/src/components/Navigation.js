import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = ({ isAuthenticated, setIsAuthenticated, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📦 Parcel Delivery
        </Link>

        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>

          {isAuthenticated ? (
            <>
              {user?.role === 'user' && (
                <>
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  <Link to="/create-parcel" className="nav-link">Send Parcel</Link>
                  <Link to="/track-parcel" className="nav-link">Track</Link>
                  <Link to="/parcel-history" className="nav-link">History</Link>
                </>
              )}

              {user?.role === 'admin' && (
                <>
                  <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
                  <Link to="/admin/manage-users" className="nav-link">Manage Users</Link>
                  <Link to="/admin/manage-parcels" className="nav-link">Manage Parcels</Link>
                </>
              )}

              {user?.role === 'agent' && (
                <>
                  <Link to="/agent/dashboard" className="nav-link">Agent Dashboard</Link>
                  <Link to="/agent/assigned-parcels" className="nav-link">Assigned Parcels</Link>
                </>
              )}

              <div className="nav-user">
                <span className="user-name">{user?.name}</span>
                <Link to="/profile" className="nav-link">Profile</Link>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
