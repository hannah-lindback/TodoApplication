import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

const AddTodoForm = ({ setTodos, setSearchResults }) => {
  const [error, setError] = useState(null);
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
    const newTodoToAdd = { ...newTodo };
    axios.post("http://localhost:8080/todos", newTodoToAdd).then((response) => {
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setSearchResults((prevResults) => [...prevResults, response.data]);
      setError(" ");
      setNewTodo({
        title: "",
        description: "",
        dueDate: "",
        completed: false,
      });
    });
    setError(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col p-4 bg-white border rounded-md justify-between h-50 md:w-100 lg:w-100 xl:w-100 2xl:w-100"
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
      <p>{error}</p>
    </form>
  );
};

export default AddTodoForm;
