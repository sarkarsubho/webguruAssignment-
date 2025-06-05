const bcrypt = require('bcryptjs');
const User = require('../models/user.model.js');
const generateToken = require('../utils/generateToken.js');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid email or password.' });

  if (user.status === 'inactive') {
    return res.status(403).json({ error: 'Account deactivated' });
  }

  const token = generateToken(user);
  res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
};

exports.logout = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.tokenVersion += 1; // Increment token version to invalidate old tokens
  await user.save();

  res.json({ message: 'Logged out successfully' });
};