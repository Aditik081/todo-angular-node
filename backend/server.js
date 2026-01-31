// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose.connect('mongodb://127.0.0.1:27017/todolist')
//   .then(() => console.log('MongoDB connected ✅'))
//   .catch(err => console.error('MongoDB error ❌', err));

// // Routes
// app.use('/todos', require('./routes/todoRoutes'));

// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- Connect MongoDB ---
mongoose.connect('mongodb://127.0.0.1:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// --- Schemas ---
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

const todoSchema = new mongoose.Schema({
  task: String
});

const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

// --- Routes ---

// Register
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({ email, password: hash });
    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Wrong password' });

  res.json({ message: 'Login successful', user });
});

// Get all todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add new todo
app.post('/todos', async (req, res) => {
  const { task } = req.body;
  const newTodo = await Todo.create({ task });
  res.json(newTodo);
});

// Update todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const updated = await Todo.findByIdAndUpdate(id, { task }, { new: true });
  res.json(updated);
});

// Delete todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: 'Todo deleted' });
});

// --- Start server ---
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
