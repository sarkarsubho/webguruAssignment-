const User = require('../models/user.model.js');

exports.getAllUsers = async (req, res) => {
  let users = await User.find({}, '-password');

  users=users.filter((user)=>user._id.toString() !== req.user._id.toString());
  res.json(users);
};

exports.changeUserStatus = async (req, res) => {
  const { userId, status } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.status = status;
  user.tokenVersion += 1;
  await user.save();

  res.json({ message: 'User status updated and token invalidated' });
};

exports.promoteToAdmin = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.role = 'admin';
  await user.save();
  res.json({ message: 'User promoted to admin' });
};

