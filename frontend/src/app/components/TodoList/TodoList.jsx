"use client";
import React, { useEffect, useState } from 'react';
import { getTodos } from '../../API/api';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const todosData = await getTodos();
        setTodos(todosData);
        console.log('Todos:', todosData);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

