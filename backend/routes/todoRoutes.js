const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// Create a new task
router.post('/add-task', async (req, res) => {
  try {
    const { taskName, status, deadline } = req.body;
    const newTask = new Todo({
      taskName,
      status,
      deadline
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
});

// Read all tasks
router.get('/get-task', async (req, res) => {
  try {
    const tasks = await Todo.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

// Update a task
router.put('/update-task/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});

// Delete a task
router.delete('/delete-task/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Todo.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
});

module.exports = router;
