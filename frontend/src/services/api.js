import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

// Parcel APIs
export const parcelAPI = {
  createParcel: (data) => api.post('/parcels/create', data),
  getMyParcels: () => api.get('/parcels/my-parcels'),
  getParcelById: (id) => api.get(`/parcels/${id}`),
  trackParcel: (id) => api.get(`/parcels/track/${id}`),
  updateParcelStatus: (id, data) => api.put(`/parcels/${id}/status`, data),
  deleteParcel: (id) => api.delete(`/parcels/${id}`)
};

// Admin APIs
export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getAllParcels: () => api.get('/admin/parcels'),
  getParcelsByStatus: (status) => api.get(`/admin/parcels/status/${status}`),
  assignParcelToAgent: (id, data) => api.post(`/admin/parcels/${id}/assign`, data),
  getDashboardStats: () => api.get('/admin/stats')
};

// Agent APIs
export const agentAPI = {
  getAssignedParcels: () => api.get('/agent/parcels'),
  updateParcelStatus: (id, data) => api.put(`/agent/parcels/${id}/status`, data),
  updateAvailability: (data) => api.put('/agent/availability', data)
};

export default api;
