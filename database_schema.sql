-- Database Schema for Parcel Delivery Management System

-- Create Database
CREATE DATABASE IF NOT EXISTS parcel_delivery_db;
USE parcel_delivery_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  role ENUM('user', 'admin', 'agent') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Parcels Table
CREATE TABLE IF NOT EXISTS parcels (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sender_id INT NOT NULL,
  recipient_name VARCHAR(100) NOT NULL,
  recipient_email VARCHAR(100),
  recipient_phone VARCHAR(20) NOT NULL,
  pickup_address TEXT,
  delivery_address TEXT NOT NULL,
  weight DECIMAL(10, 2),
  dimensions VARCHAR(50),
  description TEXT,
  status ENUM('pending', 'assigned', 'in_transit', 'delivered', 'cancelled') DEFAULT 'pending',
  assigned_agent_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_sender (sender_id),
  INDEX idx_status (status),
  INDEX idx_agent (assigned_agent_id)
);

-- Delivery Agents Table
CREATE TABLE IF NOT EXISTS delivery_agents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  vehicle_type VARCHAR(50),
  license_number VARCHAR(50) UNIQUE,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id)
);

-- Delivery History Table
CREATE TABLE IF NOT EXISTS delivery_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  parcel_id INT NOT NULL,
  agent_id INT,
  status VARCHAR(50) NOT NULL,
  location VARCHAR(255),
  notes TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parcel_id) REFERENCES parcels(id) ON DELETE CASCADE,
  FOREIGN KEY (agent_id) REFERENCES delivery_agents(id),
  INDEX idx_parcel (parcel_id),
  INDEX idx_agent (agent_id),
  INDEX idx_updated_at (updated_at)
);

-- Create indexes for better performance
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_created_at ON parcels(created_at);

-- Sample Data (Optional)
-- You can uncomment and modify these queries to add test data

-- INSERT INTO users (name, email, password, phone, address, role) VALUES
-- ('Admin User', 'admin@test.com', '$2a$10$...', '9876543210', 'Admin Address', 'admin'),
-- ('John Doe', 'john@test.com', '$2a$10$...', '9123456789', '123 Main St', 'user'),
-- ('Agent Smith', 'agent@test.com', '$2a$10$...', '9111111111', '456 Park Ave', 'agent');
