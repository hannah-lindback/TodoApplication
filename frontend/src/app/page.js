"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./components/SearchBar/Searchbar";
import TodoList from "./components/TodoList/TodoList";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import Pagination from "./components/Pagination/Pagination";
import Header from "./components/Header/Header";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(4);

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

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = searchResults.slice(indexOfFirstTodo, indexOfLastTodo);

  console.log(todos);

  return (
    <div className="flex flex-col items-center box-border w-full p-l-8 p-r-8">
      <Header />
      <SearchBar todos={todos} setSearchResults={setSearchResults} />
      <div>
        <label>Sort by: </label>
        <select onChange={handleSortChange}>
          <option value="a-z">a-z</option>
          <option value="due date">due date</option>
        </select>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 items-center">
          <TodoList
            searchResults={currentTodos}
            startEditing={startEditing}
            deleteTodo={deleteTodo}
            handleEditSubmit={handleEditSubmit}
            editingTodoId={editingTodoId}
            editFormData={editFormData}
            setEditFormData={setEditFormData}
            cancelEditing={cancelEditing}
            changeCompletionStatus={changeCompletionStatus}
          />
          <Pagination
            length={searchResults.length}
            todosPerPage={todosPerPage}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />
        </div>
        <AddTodoForm setTodos={setTodos} setSearchResults={setSearchResults} />
      </div>
    </div>
  );
}
