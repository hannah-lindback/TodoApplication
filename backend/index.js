const express = require('express');
const app = express();
const port = 8080;

let todos = [];

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});


app.get('/', (req, res) => {
    res.json({ message: 'Hello from server!' });
    });

// Basic operations for todos

app.get('/api/todos', (req, res) => {
    res.json(todos);

    });


app.post('/api/todos', (req, res) => {
    const todo = req.body;
    todos.push(todo);
    res.json(todo);
    });

app.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    todos = todos.filter((todo, index) => index !== id);
    res.json({ id });
    });

app.put('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = req.body;
    todos[id] = todo;
    res.json(todo);
    });
