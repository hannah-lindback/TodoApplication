"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faPen } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    id: Math.floor(Math.random() * 10000),
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });


  useEffect(() => {
    axios.get("http://localhost:8080/todos").then((response) => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/todos", newTodo).then((response) => {
      setTodos([...todos, response.data]);

      setNewTodo({
        title: "",
        description: "",
        dueDate: "",
        completed: false,
      });
    });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:8080/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((err) => console.error(err));
  };

  // Begin editing: set the currently editing todo id and prefill the edit form data
  const startEditing = (todo) => {
    setEditingTodoId(todo.id);
    setEditFormData({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      completed: todo.completed,
    });
  };

  // Cancel editing
  const cancelEditing = (todo) => {
    setEditingTodoId(null);
    setEditFormData({
      title: "",
      description: "",
      dueDate: "",
      completed: todo.completed,
    });
  };

  // Submit the edited todo
  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/todos/${id}`, { id, ...editFormData })
      .then((res) => {
        setTodos(todos.map((todo) => (todo.id === id ? res.data : todo)));
        setEditingTodoId(null);
      })
      .catch((err) => console.error(err));
  };

  console.log(todos
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white border border-gray-200">
      <h1>Todo App</h1>

      <form onSubmit={addTodo} className="flex flex-row p-4 border border-gray-200 rounded-md w-300 justify-between">
        <div className="flex flex-row gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            required
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          />
          <input
            type="date"
            name="dueDate"
            value={newTodo.dueDate}
            onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
          />
        </div>
        <div className="p-6 text-xl h-8 bg-blue-100 flex flex-row items-center justify-center">
          <button type="submit">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex flex-row p-4 border border-gray-200 rounded-md w-300 justify-between">
            {editingTodoId === todo.id ? (
              <form onSubmit={(e) => handleEditSubmit(e, todo.id)} className="flex flex-col gap-4 w-full">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  required
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                />
                <input
                  type="date"
                  name="dueDate"
                  value={editFormData.dueDate}
                  onChange={(e) => setEditFormData({ ...editFormData, dueDate: e.target.value })}
                />
                <div className="flex flex-row gap-4">
                  <button type="submit">
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button type="button" onClick={cancelEditing}>Cancel</button>
                </div>
              </form>
            ) : (
              <><h3>{todo.title}</h3><div className="flex flex-row justify-between w-full">
                  <button onClick={() => startEditing(todo)}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <div className="flex flex-row gap-2">

                    <p>{todo.description}</p>
                    <p>Due date: {todo.dueDate}</p>
                    <p>Completed: {todo.completed ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <button onClick={() => deleteTodo(todo.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div></>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
