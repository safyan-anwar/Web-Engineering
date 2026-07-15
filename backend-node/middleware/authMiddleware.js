const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config/database');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const bearerToken = token.startsWith('Bearer ') ? token.slice(7) : token;

  jwt.verify(bearerToken, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
  });
};

const verifyAgent = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'agent') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Agent role required.' });
    }
  });
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyAgent
};
