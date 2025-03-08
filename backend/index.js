const express = require("express");
const app = express();
const port = 8080;

const cors = require("cors");
app.use(cors());
app.use(express.json());

// some todos to start with
let todos = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Purchase milk, bread, eggs, and seasonal fruits from Ica",
    dueDate: "2025-12-31",
    completed: true,
  },
  {
    id: 2,
    title: "Plan Weekend Getaway",
    description:
      "Book a hotel, flight, and rental car for a weekend trip to the beach",
    dueDate: "2025-05-31",
    completed: false,
  },
  {
    id: 3,
    title: "Write letter to Grandma",
    description: "Send a handwritten letter to Grandma with updates on life",
    dueDate: "2025-04-01",
    completed: false,
  },
  {
    id: 4,
    title: "Call Mom",
    description: "Give Mom a call to catch up on life and say hello",
    dueDate: "2025-03-15",
    completed: true,
  },
  {
    id: 5,
    title: "Finish Homework",
    description: "Complete the remaining exercises for the math assignment",
    dueDate: "2025-03-10",
    completed: true,
  },
  {
    id: 6,
    title: "Workout",
    description:
      "Go for a run around the neighborhood and do a 30-minute strength training session",
    dueDate: "2025-03-05",
    completed: false,
  },
  {
    id: 7,
    title: "Read a Book",
    description: "Spend an hour reading a new novel in the living room",
    dueDate: "2025-03-01",
    completed: false,
  },
  {
    id: 8,
    title: "Watch a Movie",
    description:
      "Watch the latest movie release on Netflix with popcorn and snacks",
    dueDate: "2025-02-28",
    completed: false,
  },
  {
    id: 9,
    title: "Clean Room",
    description:
      "Tidy up the bedroom, vacuum the floor, and organize the closet",
    dueDate: "2025-02-25",
    completed: true,
  },
  {
    id: 10,
    title: "Cook Dinner",
    description:
      "Prepare a delicious meal for dinner using fresh ingredients from the fridge",
    dueDate: "2025-02-20",
    completed: false,
  },
  {
    id: 11,
    title: "Buy groceries",
    description: "Purchase milk, bread, eggs, and seasonal fruits from Ica",
    dueDate: "2025-12-31",
    completed: false,
  },
  {
    id: 12,
    title: "Plan Weekend Getaway",
    description:
      "Book a hotel, flight, and rental car for a weekend trip to the beach",
    dueDate: "2025-05-31",
    completed: false,
  },
  {
    id: 13,
    title: "Write letter to Grandma",
    description: "Send a handwritten letter to Grandma with updates on life",
    dueDate: "2025-04-01",
    completed: false,
  },
  {
    id: 14,
    title: "Call Mom",
    description: "Give Mom a call to catch up on life and say hello",
    dueDate: "2025-03-15",
    completed: false,
  },
];

app.listen(port, () => {
  console.log(`Server is running on port https://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post("/todos", (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.json(todo);
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  todos = todos.filter((todo) => todo.id !== id);
  res.json({ id });
});

// Update a todo
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedTodo = req.body;
  todos = todos.map((todo) => (todo.id === id ? updatedTodo : todo));
  res.json(updatedTodo);
});
