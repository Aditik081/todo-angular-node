const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect('mongodb://127.0.0.1:27017/todoapp')
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.log('MongoDB error ❌', err));

// Schema
const Todo = mongoose.model('Todo', {
  task: String
});

// GET
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST
app.post('/todos', async (req, res) => {
  const todo = new Todo({ task: req.body.task });
  await todo.save();
  res.status(201).json(todo);
});

// DELETE
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
