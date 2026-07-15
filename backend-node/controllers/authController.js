const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/database');

exports.register = async (req, res) => {
  process.stderr.write('===== REGISTER CALLED =====\n');
  try {
    const { name, email, password, phone, role, address } = req.body;
    process.stderr.write(`Body: ${JSON.stringify({ name, email, phone, role, address, hasPassword: !!password })}\n`);

    // Validate input
    if (!name || !email || !password || !phone) {
      process.stderr.write('Validation failed\n');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    process.stderr.write('Checking existing user...\n');
    try {
      const existingUser = User.findByEmail(email);
      if (existingUser) {
        process.stderr.write('User already exists\n');
        return res.status(400).json({ message: 'Email already registered' });
      }
    } catch (e) {
      process.stderr.write(`Error checking existing user: ${e.message}\n`);
    }

    // Hash password
    process.stderr.write('Hashing password...\n');
    const hashedPassword = await bcrypt.hash(password, 10);
    process.stderr.write('Password hashed successfully\n');

    // Create user
    const userData = {
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || 'user',
      address: address || ''
    };

    process.stderr.write('Creating user...\n');
    try {
      const result = User.create(userData);
      process.stderr.write(`User created successfully: ${JSON.stringify(result)}\n`);
    } catch (createError) {
      process.stderr.write(`Error creating user: ${createError.message}\n`);
      if (createError.message && createError.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      throw createError;
    }

    process.stderr.write('Sending success response\n');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    process.stderr.write(`Register error: ${error.message || error}\n`);
    process.stderr.write(`Stack: ${error.stack}\n`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const userData = { name, email, phone, address };
    User.update(req.user.id, userData);

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
