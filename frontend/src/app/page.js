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

/**
 * Entry point for application
 * @returns {JSX.Element} Home page
 */
export default function Home() {
  const [todos, setTodos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(5);

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
    } else {
      sortedTodos = [...todos];
    }

    setSearchResults(sortedTodos);
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:8080/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        setSearchResults(searchResults.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error(err));
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
        return { ...todo, completed: !todo.completed };
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

  return (
    <div className="p-4">
      <Header />
      <div className="flex flex-col items-center py-2">
        <div className="flex flex-col-reverse gap-2 md:flex-row md:gap-4 lg:flex-row lg:gap-4 xl:flex-row xl:gap-4 2xl:flex-row 2xl:gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:justify-between lg:flex-row lg:gap-4 lg:justify-between xl:flex-row xl:justify-between xl:gap-4 2xl:flex-row 2xl:gap-4 2xl:justify-between">
              <SearchBar todos={todos} setSearchResults={setSearchResults} />
              <div className="flex justify-center items-center">
                <label htmlFor="sort">Sort by: </label>
                <select
                  onChange={handleSortChange}
                  name="sort"
                  className="focus:outline-none"
                >
                  <option value="oldest-newest">old to new</option>
                  <option value="a-z">A-Z</option>
                  <option value="due date">due date</option>
                </select>
              </div>
            </div>
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
            <div className="flex justify-center items-center ">
              <Pagination
                length={searchResults.length}
                todosPerPage={todosPerPage}
                handlePagination={handlePagination}
                currentPage={currentPage}
              />
            </div>
          </div>
          <AddTodoForm
            setTodos={setTodos}
            setSearchResults={setSearchResults}
          />
        </div>
      </div>
    </div>
  );
}
