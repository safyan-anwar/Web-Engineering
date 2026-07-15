const db = require('../config/db');

class User {
  static create(userData) {
    const { name, email, password, phone, role, address } = userData;
    const stmt = db.prepare(
      'INSERT INTO users (name, email, password, phone, role, address) VALUES (?, ?, ?, ?, ?, ?)'
    );
    const result = stmt.run(name, email, password, phone, role, address);
    return { insertId: result.lastInsertRowid };
  }

  static findByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  }

  static findById(id) {
    const stmt = db.prepare(
      'SELECT id, name, email, phone, role, address, created_at FROM users WHERE id = ?'
    );
    return stmt.get(id);
  }

  static getAll() {
    const stmt = db.prepare(
      'SELECT id, name, email, phone, role, address, created_at FROM users'
    );
    return stmt.all() || [];
  }

  static update(id, userData) {
    const { name, email, phone, address } = userData;
    const stmt = db.prepare(
      'UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?'
    );
    const result = stmt.run(name, email, phone, address, id);
    return { changes: result.changes };
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(id);
    return { changes: result.changes };
  }
}

module.exports = User;
