const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create payload for JWT
    const payload = {
      id: user._id,
      role: user.role,
      customerId: user.customerId || null,
    };

    // Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    // Success response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        customerId: user.customerId || null,
      },
    });

  } catch (error) {
    console.error('🔴 Login error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
