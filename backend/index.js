const express = require("express");
const app = express();
const port = 8080;
const uuid = require("uuid");

const cors = require("cors");
app.use(cors());
app.use(express.json());

let todos = [
  {
    id: uuid.v4(),
    title: "Buy groceries",
    description: "Purchase milk, bread, eggs, and seasonal fruits from Ica",
    dueDate: "2025-03-17",
    completed: true,
  },
  {
    id: uuid.v4(),
    title: "Plan Weekend Getaway",
    description:
      "Book a hotel, flight, and rental car for a weekend trip to the beach",
    dueDate: "2025-05-31",
    completed: false,
  },
  {
    id: uuid.v4(),
    title: "Write letter to Grandma",
    description: "Send a handwritten letter to Grandma with updates on life",
    dueDate: "2025-04-01",
    completed: false,
  },
  {
    id: uuid.v4(),
    title: "Call Mom",
    description: "Give Mom a call to catch up on life and say hello",
    dueDate: "2025-03-12",
    completed: true,
  },
  {
    id: uuid.v4(),
    title: "Finish Homework",
    description: "Complete the remaining exercises for the math assignment",
    dueDate: "2025-03-10",
    completed: true,
  },
  {
    id: uuid.v4(),
    title: "Walk the Dog",
    description: "Take Fluffy for a walk around the neighborhood",
    dueDate: "2025-03-011",
    completed: false,
  },
  {
    id: uuid.v4(),
    title: "Workout",
    description: "Go to the gym for a workout session",
    dueDate: "2025-03-011",
    completed: true,
  },
  {
    id: uuid.v4(),
    title: "Read Book",
    description: "Spend an hour reading the latest novel",
    dueDate: "2025-02-28",
    completed: false,
  },
  {
    id: uuid.v4(),
    title: "Clean Room",
    description: "Tidy up the bedroom and organize the closet",
    dueDate: "2025-02-25",
    completed: true,
  },
];

app.listen(port, () => {
  console.log(`Server is running on port https://localhost:${port}`);
});

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post("/todos", (req, res) => {
  const todo = req.body;
  todo.id = uuid.v4();

  todos.push(todo);
  res.json(todo);
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== id);
  res.json({ id });
});

// Update a todo
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;
  todos = todos.map((todo) => (todo.id === id ? updatedTodo : todo));
  res.json(updatedTodo);
});
