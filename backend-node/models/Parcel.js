const db = require('../config/db');

class Parcel {
  static create(parcelData) {
    const { sender_id, recipient_name, recipient_email, recipient_phone, pickup_address, delivery_address, weight, dimensions, description, status } = parcelData;
    const stmt = db.prepare(
      'INSERT INTO parcels (sender_id, recipient_name, recipient_email, recipient_phone, pickup_address, delivery_address, weight, dimensions, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    const result = stmt.run(sender_id, recipient_name, recipient_email, recipient_phone, pickup_address, delivery_address, weight, dimensions, description, status || 'pending');
    return { insertId: result.lastInsertRowid };
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM parcels WHERE id = ?');
    return stmt.get(id);
  }

  static findBySenderId(senderId) {
    const stmt = db.prepare('SELECT * FROM parcels WHERE sender_id = ? ORDER BY created_at DESC');
    return stmt.all(senderId) || [];
  }

  static getAll() {
    const stmt = db.prepare('SELECT * FROM parcels ORDER BY created_at DESC');
    return stmt.all() || [];
  }

  static getByStatus(status) {
    const stmt = db.prepare('SELECT * FROM parcels WHERE status = ? ORDER BY created_at DESC');
    return stmt.all(status) || [];
  }

  static update(id, parcelData) {
    const { recipient_name, recipient_email, recipient_phone, delivery_address, weight, dimensions, description, status } = parcelData;
    const stmt = db.prepare(
      'UPDATE parcels SET recipient_name = ?, recipient_email = ?, recipient_phone = ?, delivery_address = ?, weight = ?, dimensions = ?, description = ?, status = ? WHERE id = ?'
    );
    const result = stmt.run(recipient_name, recipient_email, recipient_phone, delivery_address, weight, dimensions, description, status, id);
    return { changes: result.changes };
  }

  static assignAgent(parcelId, agentId) {
    const stmt = db.prepare(
      'UPDATE parcels SET assigned_agent_id = ?, status = ? WHERE id = ?'
    );
    const result = stmt.run(agentId, 'assigned', parcelId);
    return { changes: result.changes };
  }

  static updateStatus(id, status) {
    const stmt = db.prepare('UPDATE parcels SET status = ? WHERE id = ?');
    const result = stmt.run(status, id);
    return { changes: result.changes };
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM parcels WHERE id = ?');
    const result = stmt.run(id);
    return { changes: result.changes };
  }
}

module.exports = Parcel;
