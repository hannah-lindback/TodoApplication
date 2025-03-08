import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faTrash,
  faPen,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

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
    <li className="flex flex-row p-4 gap-2 bg-white border rounded-md justify-between w-200 items-center">
      {isEditing ? (
        <form className="w-full" onSubmit={(e) => handleEditSubmit(e, todo.id)}>
          <div className="flex flex-row gap-2 font-sans justify-between items-center">
            <div className="flex flex-col gap-2">
              <input
                className="text-2xl"
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
            </div>
            <div className="flex flex-row gap-4 justify-center items-center">
              <button className="text-3xl" type="submit">
                <FontAwesomeIcon icon={faFloppyDisk}></FontAwesomeIcon>
              </button>
              <button type="button" onClick={() => cancelEditing(todo)}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div>
            {todo.completed ? (
              <button onClick={(e) => changeCompletionStatus(e, todo.id)}>
                <Image
                  src="/checkbox.svg"
                  alt="checkbox-img"
                  width={40}
                  height={40}
                />
              </button>
            ) : (
              <button
                className="w-7 h-7 border border-rose-400 rounded-md"
                onClick={(e) => changeCompletionStatus(e, todo.id)}
              ></button>
            )}
          </div>
          <div
            className={`flex flex-col gap-2 w-200 ${
              todo.completed ? "line-through" : ""
            }`}
          >
            <h3 className="text-2xl">{todo.title}</h3>
            <section className="font-sans">{todo.description}</section>
          </div>
          <div className="flex flex-row gap-4 justify-center items-center">
            <p className="font-sans text-sm w-30">Due: {todo.dueDate}</p>
            <button onClick={() => startEditing(todo)}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button onClick={() => deleteTodo(todo.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default Todo;
