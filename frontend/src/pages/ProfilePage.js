import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import '../styles/ProfilePage.css';

const ProfilePage = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setFormData({
        name: response.data.user.name,
        email: response.data.user.email,
        phone: response.data.user.phone,
        address: response.data.user.address
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await authAPI.updateProfile(formData);
      setSuccess('Profile updated successfully');
      setEditing(false);
      localStorage.setItem('user', JSON.stringify({
        ...user,
        ...formData
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>My Profile</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {editing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="button-group">
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button type="button" onClick={() => setEditing(false)} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        ) : (
          <div className="profile-view">
            <div className="profile-item">
              <label>Name:</label>
              <p>{formData.name}</p>
            </div>
            <div className="profile-item">
              <label>Email:</label>
              <p>{formData.email}</p>
            </div>
            <div className="profile-item">
              <label>Phone:</label>
              <p>{formData.phone || 'Not provided'}</p>
            </div>
            <div className="profile-item">
              <label>Address:</label>
              <p>{formData.address || 'Not provided'}</p>
            </div>
            <button onClick={() => setEditing(true)} className="btn btn-primary">Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
