import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

const AddTodoForm = ({ setTodos, setSearchResults, setError }) => {
  const [newTodo, setNewTodo] = useState({
    id: Math.floor(Math.random() * 10000),
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
    const newTodoToAdd = { ...newTodo, id: Math.floor(Math.random() * 10000) };
    axios.post("http://localhost:8080/todos", newTodoToAdd).then((response) => {
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setSearchResults((prevResults) => [...prevResults, response.data]);
      setError(" ");
      setNewTodo({
        id: Math.floor(Math.random() * 10000),
        title: "",
        description: "",
        dueDate: "",
        completed: false,
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row p-4 border border-gray-200 rounded-md w-content justify-between gap-5"
    >
      <div className="flex flex-row gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newTodo.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTodo.description}
          onChange={handleChange}
        />
        <hr className="text-black"></hr>

        <input
          type="date"
          name="dueDate"
          value={newTodo.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="p-6 text-xl h-8 bg-rose-400 flex flex-row items-center justify-center">
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
