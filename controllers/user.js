const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashed
    });

    await newUser.save();

    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const match = await bcrypt.compare(req.body.password, user?.password || '');
    if (!user || !match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' });
    res.status(200).json({ access: token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports.details = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    const decoded = jwt.verify(token, 'yourSecretKey');
    const user = await User.findById(decoded.userId).select('-password'); 
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve user details' });
  }
};