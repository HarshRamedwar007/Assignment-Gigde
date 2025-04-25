const express = require('express');
const Project = require('../Models/Project');
const auth = require('../Middleware/Auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const count = await Project.countDocuments({ userId: req.user.id });
  if (count >= 4) return res.status(400).json({ message: 'Max 4 projects allowed' });

  const project = new Project({ name: req.body.name, userId: req.user.id });
  await project.save();
  res.status(201).json(project);
});

router.get('/', auth, async (req, res) => {
  const projects = await Project.find({ userId: req.user.id });
  res.json(projects);
});

module.exports = router;
