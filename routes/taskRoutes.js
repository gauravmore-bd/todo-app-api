const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  rateTask,
  getAverageRating,
  getProgress
} = require('../controllers/taskController');

// Protect all routes
router.use(auth);

// Routes
router.post('/', createTask);
router.get('/', getTasks);
router.get('/progress', getProgress);
router.get('/stats/average-rating', getAverageRating);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/rate', rateTask);

module.exports = router;
