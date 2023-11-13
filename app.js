const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

// Middleware to parse JSON data
app.use(bodyParser.json());

// In-memory database
let todos = [];

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const newTodo = req.body.todo;
  todos.push(newTodo);
  res.json({ message: 'Todo added successfully', todo: newTodo });
});

// Delete a todo by index
app.delete('/todos/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < todos.length) {
    const deletedTodo = todos.splice(index, 1);
    res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});
