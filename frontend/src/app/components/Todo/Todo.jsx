import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

const Todo = ({
  todo,
  startEditing,
  deleteTodo,
  handleEditSubmit,
  editingTodoId,
  editFormData,
  setEditFormData,
  cancelEditing,
  changeCompletionStatus,
}) => {
  const isEditing = editingTodoId === todo.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  return (
    <li className="flex flex-row p-4 border border-gray-200 rounded-md w-300 justify-between">
      {isEditing ? (
        <form
          onSubmit={(e) => handleEditSubmit(e, todo.id)}
          className="flex flex-row gap-2"
        >
          <input
            type="text"
            name="title"
            value={editFormData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            value={editFormData.description}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dueDate"
            value={editFormData.dueDate}
            onChange={handleChange}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => cancelEditing(todo)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          {todo.completed ? (
            <>
              <div className="flex flex-row gap-2 line-through">
                <form>
                  <input
                    type="checkbox"
                    name="completed"
                    checked={todo.completed}
                    onChange={(e) => changeCompletionStatus(e, todo.id)}
                  />
                </form>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <p>Due date: {todo.dueDate}</p>
                <p>Completed: {todo.completed ? "Yes" : "No"}</p>
              </div>
              <div className="flex flex-row gap-4">
                <button onClick={() => startEditing(todo)}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row gap-2">
                <form>
                  <input
                    type="checkbox"
                    name="completed"
                    checked={todo.completed}
                    onChange={(e) => changeCompletionStatus(e, todo.id)}
                  />
                </form>
                <h3>{todo.title}</h3>
                <section className="">{todo.description}</section>
                <p>Due: {todo.dueDate}</p>
                <p>Completed: {todo.completed ? "Yes" : "No"}</p>
              </div>
              <div className="flex flex-row gap-4">
                <button onClick={() => startEditing(todo)}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </>
          )}
        </>
      )}
    </li>
  );
};

export default Todo;
