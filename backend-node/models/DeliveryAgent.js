const db = require('../config/db');

class DeliveryAgent {
  static create(agentData) {
    const { user_id, vehicle_type, license_number, is_available } = agentData;
    const stmt = db.prepare(
      'INSERT INTO delivery_agents (user_id, vehicle_type, license_number, is_available) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(user_id, vehicle_type, license_number, is_available || 1);
    return { insertId: result.lastInsertRowid };
  }

  static findById(id) {
    const stmt = db.prepare(
      'SELECT da.*, u.name, u.email, u.phone FROM delivery_agents da JOIN users u ON da.user_id = u.id WHERE da.id = ?'
    );
    return stmt.get(id);
  }

  static getAll() {
    const stmt = db.prepare(
      'SELECT da.*, u.name, u.email, u.phone FROM delivery_agents da JOIN users u ON da.user_id = u.id'
    );
    return stmt.all() || [];
  }

  static getAssignedParcels(agentId) {
    const stmt = db.prepare(
      'SELECT * FROM parcels WHERE assigned_agent_id = ? ORDER BY created_at DESC'
    );
    return stmt.all(agentId) || [];
  }

  static updateAvailability(id, isAvailable) {
    const stmt = db.prepare('UPDATE delivery_agents SET is_available = ? WHERE id = ?');
    const result = stmt.run(isAvailable ? 1 : 0, id);
    return { changes: result.changes };
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM delivery_agents WHERE id = ?');
    const result = stmt.run(id);
    return { changes: result.changes };
  }
}

module.exports = DeliveryAgent;
