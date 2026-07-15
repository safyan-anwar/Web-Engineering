require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { port, nodeEnv } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const parcelRoutes = require('./routes/parcelRoutes');
const adminRoutes = require('./routes/adminRoutes');
const agentRoutes = require('./routes/agentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/parcels', parcelRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/agent', agentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Error handler middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Environment: ${nodeEnv}`);
});
