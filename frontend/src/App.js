import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';

// Pages - User
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import CreateParcelPage from './pages/CreateParcelPage';
import TrackParcelPage from './pages/TrackParcelPage';
import ParcelHistoryPage from './pages/ParcelHistoryPage';
import ProfilePage from './pages/ProfilePage';

// Pages - Admin
import AdminDashboard from './pages/AdminDashboard';
import ManageUsersPage from './pages/ManageUsersPage';
import ManageParcelsPage from './pages/ManageParcelsPage';

// Pages - Agent
import AgentDashboard from './pages/AgentDashboard';
import AssignedParcelsPage from './pages/AssignedParcelsPage';

// Components
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <Router>
      <Navigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* User Routes */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute component={<UserDashboard user={user} />} requiredRole="user" />} 
        />
        <Route 
          path="/create-parcel" 
          element={<ProtectedRoute component={<CreateParcelPage />} requiredRole="user" />} 
        />
        <Route 
          path="/track-parcel" 
          element={<ProtectedRoute component={<TrackParcelPage />} requiredRole="user" />} 
        />
        <Route 
          path="/parcel-history" 
          element={<ProtectedRoute component={<ParcelHistoryPage />} requiredRole="user" />} 
        />
        <Route 
          path="/profile" 
          element={<ProtectedRoute component={<ProfilePage user={user} />} requiredRole="user" />} 
        />

        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={<ProtectedRoute component={<AdminDashboard />} requiredRole="admin" />} 
        />
        <Route 
          path="/admin/manage-users" 
          element={<ProtectedRoute component={<ManageUsersPage />} requiredRole="admin" />} 
        />
        <Route 
          path="/admin/manage-parcels" 
          element={<ProtectedRoute component={<ManageParcelsPage />} requiredRole="admin" />} 
        />

        {/* Agent Routes */}
        <Route 
          path="/agent/dashboard" 
          element={<ProtectedRoute component={<AgentDashboard />} requiredRole="agent" />} 
        />
        <Route 
          path="/agent/assigned-parcels" 
          element={<ProtectedRoute component={<AssignedParcelsPage />} requiredRole="agent" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
