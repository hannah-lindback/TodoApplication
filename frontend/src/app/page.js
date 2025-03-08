"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./components/SearchBar/Searchbar";
import TodoList from "./components/TodoList/TodoList";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
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
      setSearchResults(response.data);
    });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.title || !newTodo.description || !newTodo.dueDate) {
      setError("Please fill out all fields");
      return;
    }
    const newTodoToAdd = { ...newTodo, id: Math.floor(Math.random() * 10000) };
    axios.post("http://localhost:8080/todos", newTodoToAdd).then((response) => {
      setTodos([...todos, response.data]);
      setSearchResults([...todos, response.data]);

      setNewTodo({
        id: Math.floor(Math.random() * 10000),
        title: "",
        description: "",
        dueDate: "",
        completed: false,
      });
      setError(" ");
    });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:8080/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)));
    setSearchResults(searchResults.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditingTodoId(todo.id);
    setEditFormData({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      completed: todo.completed,
    });
  };

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
        setSearchResults(
          searchResults.map((todo) => (todo.id === id ? res.data : todo))
        );
        setEditingTodoId(null);
      })
      .catch((err) => console.error(err));
  };

  console.log(todos);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white border border-gray-200">
      <h1>Todo App</h1>
      <SearchBar todos={todos} setSearchResults={setSearchResults} />
      <button>Sort</button>
      <p>{error}</p>
      <form
        onSubmit={addTodo}
        className="flex flex-row p-4 border border-gray-200 rounded-md w-300 justify-between"
      >
        <div className="flex flex-row gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
          />
          <input
            type="date"
            name="dueDate"
            value={newTodo.dueDate}
            onChange={(e) =>
              setNewTodo({ ...newTodo, dueDate: e.target.value })
            }
          />
        </div>

        <div className="p-6 text-xl h-8 bg-blue-100 flex flex-row items-center justify-center">
          <button type="submit">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </form>

      <TodoList
        searchResults={searchResults}
        startEditing={startEditing}
        deleteTodo={deleteTodo}
        handleEditSubmit={handleEditSubmit}
        editingTodoId={editingTodoId}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        cancelEditing={cancelEditing}
      />
    </div>
  );
}
