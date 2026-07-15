import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parcelAPI } from '../services/api';
import '../styles/FormPage.css';

const CreateParcelPage = () => {
  const [formData, setFormData] = useState({
    recipient_name: '',
    recipient_email: '',
    recipient_phone: '',
    delivery_address: '',
    pickup_address: '',
    weight: '',
    dimensions: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setLoading(true);

    try {
      const response = await parcelAPI.createParcel(formData);
      setSuccess(`Parcel created successfully! Tracking ID: ${response.data.parcel_id}`);
      setFormData({
        recipient_name: '',
        recipient_email: '',
        recipient_phone: '',
        delivery_address: '',
        pickup_address: '',
        weight: '',
        dimensions: '',
        description: ''
      });
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create parcel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>Create New Parcel</h1>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Recipient Name:</label>
              <input
                type="text"
                name="recipient_name"
                value={formData.recipient_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Recipient Phone:</label>
              <input
                type="tel"
                name="recipient_phone"
                value={formData.recipient_phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Recipient Email:</label>
            <input
              type="email"
              name="recipient_email"
              value={formData.recipient_email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Pickup Address:</label>
            <textarea
              name="pickup_address"
              value={formData.pickup_address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Delivery Address:</label>
            <textarea
              name="delivery_address"
              value={formData.delivery_address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Weight (kg):</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                step="0.1"
                required
              />
            </div>
            <div className="form-group">
              <label>Dimensions (L x W x H):</label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                placeholder="e.g., 10x10x10"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Creating...' : 'Create Parcel'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateParcelPage;
