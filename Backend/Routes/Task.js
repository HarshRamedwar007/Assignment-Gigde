const express = require('express');
const Task = require('../Models/Task');
const auth = require('../Middleware/Auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const task = new Task({ ...req.body });
  await task.save();
  res.status(201).json(task);
});

router.get('/:projectId', auth, async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId });
  res.json(tasks);
});

router.put('/:id', auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;


