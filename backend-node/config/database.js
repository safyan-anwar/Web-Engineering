const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config();

const dbPath = path.join(__dirname, '../parcel_delivery.db');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

const initializeDatabase = () => {
  // Users table
  db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Parcels table
  db.exec(`CREATE TABLE IF NOT EXISTS parcels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER NOT NULL,
    recipient_name TEXT NOT NULL,
    recipient_email TEXT,
    recipient_phone TEXT NOT NULL,
    pickup_address TEXT,
    delivery_address TEXT NOT NULL,
    weight REAL,
    dimensions TEXT,
    description TEXT,
    status TEXT DEFAULT 'pending',
    assigned_agent_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id)
  )`);

  // Delivery agents table
  db.exec(`CREATE TABLE IF NOT EXISTS delivery_agents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    vehicle_type TEXT,
    license_number TEXT UNIQUE,
    is_available BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  // Delivery history table
  db.exec(`CREATE TABLE IF NOT EXISTS delivery_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parcel_id INTEGER NOT NULL,
    agent_id INTEGER,
    status TEXT NOT NULL,
    location TEXT,
    notes TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parcel_id) REFERENCES parcels(id),
    FOREIGN KEY (agent_id) REFERENCES delivery_agents(id)
  )`);
};

console.log('✅ Connected to SQLite database');
initializeDatabase();

module.exports = {
  db,
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development'
};
