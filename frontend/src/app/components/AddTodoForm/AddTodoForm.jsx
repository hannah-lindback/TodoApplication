import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

/**
 * JSX component that displays a form to add a new todo
 * @param {*} param0
 * @returns form element with input fields for title, description, and due date
 */
const AddTodoForm = ({ setTodos, setSearchResults, setCurrentPage }) => {
  const [error, setError] = useState(null);
  const todaysDate = () => {
    const year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  };

  const [newTodo, setNewTodo] = useState({
    id: null,
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.title || !newTodo.description || !newTodo.dueDate) {
      setError("Please fill out all fields");
      return;
    }
    if (todaysDate() > newTodo.dueDate) {
      setError("That date has already passed. Try again.");
      return;
    }

    const newTodoToAdd = { ...newTodo };
    axios.post("http://localhost:8080/todos", newTodoToAdd).then((response) => {
      setTodos((prevTodos) => [response.data, ...prevTodos]);
      setSearchResults((prevResults) => [response.data, ...prevResults]);
      setError(" ");
      setNewTodo({
        title: "",
        description: "",
        dueDate: "",
        completed: false,
      });
      setCurrentPage(1);
    });
    setError(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 bg-white border rounded-md justify-between h-60 md:w-100 lg:w-100 xl:w-100 2xl:w-100"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl">Add a new todo</h2>
        <input
          type="text"
          name="title"
          placeholder="Title..."
          value={newTodo.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description..."
          value={newTodo.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dueDate"
          value={newTodo.dueDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          className="text-white text-xl p-2 h-8 w-full text-sm bg-rose-400 flex flex-row items-center justify-center"
          type="submit"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <p className="text-red-400 font-medium text-center">{error}</p>
    </form>
  );
};

export default AddTodoForm;
