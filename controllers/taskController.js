const Task = require('../models/task');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const task = new Task({
      user: req.user.id,
      title,
      description,
      dueDate
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error while creating task' });
  }
};

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching tasks' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, isCompleted, dueDate } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, isCompleted, dueDate },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error while updating task' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while deleting task' });
  }
};

// Rate a task
exports.rateTask = async (req, res) => {
  try {
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { rating },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error while rating task' });
  }
};

// Get average rating for user's tasks
exports.getAverageRating = async (req, res) => {
  try {
    const result = await Task.aggregate([
      { $match: { user: req.user._id, rating: { $ne: null } } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' }
        }
      }
    ]);

    const averageRating = result.length > 0 ? result[0].averageRating : 0;

    res.json({ averageRating });
  } catch (err) {
    res.status(500).json({ error: 'Server error while calculating average rating' });
  }
};

// Get progress stats: total, completed, pending
exports.getProgress = async (req, res) => {
  try {
    const total = await Task.countDocuments({ user: req.user.id });
    const completed = await Task.countDocuments({ user: req.user.id, isCompleted: true });
    const pending = total - completed;

    res.json({ total, completed, pending });
  } catch (err) {
    res.status(500).json({ error: 'Server error while calculating progress' });
  }
};
