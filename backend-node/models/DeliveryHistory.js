const db = require('../config/db');

class DeliveryHistory {
  static create(historyData) {
    const { parcel_id, agent_id, status, location, notes } = historyData;
    const stmt = db.prepare(
      'INSERT INTO delivery_history (parcel_id, agent_id, status, location, notes) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(parcel_id, agent_id, status, location, notes);
    return { insertId: result.lastInsertRowid };
  }

  static getByParcelId(parcelId) {
    const stmt = db.prepare(
      'SELECT * FROM delivery_history WHERE parcel_id = ? ORDER BY updated_at DESC'
    );
    return stmt.all(parcelId) || [];
  }

  static getByAgentId(agentId) {
    const stmt = db.prepare(
      'SELECT * FROM delivery_history WHERE agent_id = ? ORDER BY updated_at DESC'
    );
    return stmt.all(agentId) || [];
  }

  static getAll() {
    const stmt = db.prepare('SELECT * FROM delivery_history ORDER BY updated_at DESC');
    return stmt.all() || [];
  }
}

module.exports = DeliveryHistory;
