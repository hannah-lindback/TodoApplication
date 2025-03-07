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

app.get('/api/todos', (req, res) => {
    res.json(todos);

    });


app.post('/api/todos', (req, res) => {
    const todo = req.body;
    todos.push(todo);
    res.json(todo);
    });