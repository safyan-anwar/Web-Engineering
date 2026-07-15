import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import '../styles/ManageUsers.css';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getAllUsers();
      setUsers(response.data.users);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await adminAPI.deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting user');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="manage-users-container">
      <h1>Manage Users</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td><span className="role-badge">{user.role}</span></td>
                <td>
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsersPage;
