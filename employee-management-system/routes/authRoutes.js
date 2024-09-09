// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, phone, department, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with all fields
    const newUser = new User({ name, email, phone, department, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;  // This should now contain the correct data

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create a JWT token
      const token = jwt.sign(
          { userId: user._id, name: user.name },
          'your_jwt_secret_key',
          { expiresIn: '1h' }
      );

      res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});


router.get('/users', async (req, res) => {
  try {
      const users = await User.find({}, 'name email phone department createdAt', );  // Adjust fields as needed
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

