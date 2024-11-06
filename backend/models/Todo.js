
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'In progress', 'Completed'],
 
  },
  deadline: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

