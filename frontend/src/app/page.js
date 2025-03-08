"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./components/SearchBar/Searchbar";
import TodoList from "./components/TodoList/TodoList";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [dates, setDates] = useState([]);
  const [error, setError] = useState(null);
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

      const datesArray = response.data.map((todo) => todo.dueDate);
      setDates(datesArray);
    });
  }, []);

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

  const cancelEditing = () => {
    setEditingTodoId(null);
    setEditFormData({
      title: "",
      description: "",
      dueDate: "",
      completed: false,
    });
  };

  const handleSortChange = (e) => {
    let sortType = e.target.value;
    let sortedTodos = [...searchResults];

    if (sortType === "a-z") {
      sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "due date") {
      sortedTodos.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    }

    setSearchResults(sortedTodos);
  };

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

  const changeCompletionStatus = (e, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: e.target.checked };
      }
      return todo;
    });

    const updatedTodo = updatedTodos.find((todo) => todo.id === id);

    axios
      .put(`http://localhost:8080/todos/${id}`, updatedTodo)
      .then((res) => {
        setTodos(updatedTodos);
        setSearchResults(
          searchResults.map((todo) => (todo.id === id ? res.data : todo))
        );
      })
      .catch((err) => console.error(err));
  };

  console.log(todos);
  console.log(searchResults);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white border border-gray-200">
      <h1>Todo App</h1>
      <SearchBar todos={todos} setSearchResults={setSearchResults} />
      <div>
        <label htmlFor="sort">Sort by: </label>
        <select onChange={handleSortChange}>
          <option value="a-z">a-z</option>
          <option value="due date">due date</option>
        </select>
      </div>

      <p>{error}</p>
      <AddTodoForm
        setTodos={setTodos}
        setSearchResults={setSearchResults}
        setError={setError}
      />
      <TodoList
        searchResults={searchResults}
        startEditing={startEditing}
        deleteTodo={deleteTodo}
        handleEditSubmit={handleEditSubmit}
        editingTodoId={editingTodoId}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        cancelEditing={cancelEditing}
        changeCompletionStatus={changeCompletionStatus} // Pass the function here
      />
    </div>
  );
}
