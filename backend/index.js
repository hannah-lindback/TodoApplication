const express = require('express');
const app = express();
const port = 8080;

const cors = require('cors');
app.use(cors());
app.use(express.json());

// some todos to start with
let todos = [
  {
    id: 1,
    title: 'Buy groceries',
    description: 'Purchase milk, bread, eggs, and seasonal fruits from Ica',
    dueDate: '2025-12-31',
    completed: false,

  },
  {
    id: 2,
    title: 'Plan Weekend Getaway',
    description: 'Book a hotel, flight, and rental car for a weekend trip to the beach',
    dueDate: '2025-05-31',
    completed: false,

  }, 
  {
    id: 3,
    title: 'Write letter to Grandma',
    description: 'Send a handwritten letter to Grandma with updates on life',
    dueDate: '2025-04-01',
    completed: false,
  },
];

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.json(todo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  todos = todos.filter((todo) => todo.id !== id);
  res.json({ id });
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedTodo = req.body;
  todos = todos.map((todo) => (todo.id === id ? updatedTodo : todo));
  res.json(updatedTodo);
}
);