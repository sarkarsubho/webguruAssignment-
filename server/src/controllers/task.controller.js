const Task = require('../models/task.model.js');

// Create dummy tasks (One-time use)
exports.seedTasks = async (req, res) => {
  const sampleTasks = Array.from({ length: 30 }, (_, i) => ({
    title: `Sample Task ${i + 1}`,
    description: `Description for task ${i + 1}`,
    status: 'pending'
  }));

  await Task.insertMany(sampleTasks);
  res.json({ message: 'Dummy tasks created' });
};

// Get paginated tasks
exports.getTasks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const tasks = await Task.find().skip(skip).limit(limit);
  const total = await Task.countDocuments();

  res.json({
    tasks,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  });
};

// Bulk update status
exports.bulkUpdateStatus = async (req, res) => {
  const { taskIds, status } = req.body;

  if (!Array.isArray(taskIds) || !status) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  await Task.updateMany(
    { _id: { $in: taskIds } },
    { $set: { status } }
  );

  res.json({ message: `${taskIds.length} tasks updated to "${status}"` });
};
