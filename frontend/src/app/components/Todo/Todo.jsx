import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faTrash,
  faPen,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

/**
 * JSX element that displays a todo
 * @param {*} param0
 * @returns Object that represents a todo with title, description, due date, and completion status
 */
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

  const isDueTodayOrEarlier = (dueDate) => {
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
    return todaysDate() >= dueDate;
  };

  return (
    <li
      className={`flex flex-row p-4 gap-1 bg-white border items-center sm:w-100 md:w-200 lg:w-200 xl:w-200 2xl:w-200 ${
        isDueTodayOrEarlier(todo.dueDate) ? "bg-yellow-100" : ""
      }`}
    >
      {isEditing ? (
        <form
          className=" gap-4 w-full md:items-center md:flex flex-row lg:items-center lg:flex flex-row  xl:flex flex-row xl:items-center 2xl:flex flex-row 2xl:items-center"
          onSubmit={(e) => handleEditSubmit(e, todo.id)}
        >
          <input
            className="text-2xl w-full"
            type="text"
            name="title"
            value={editFormData.title}
            onChange={handleChange}
            required
          />
          <input
            className="w-full"
            type="text"
            name="description"
            value={editFormData.description}
            onChange={handleChange}
            required
          />
          <input
            className="w-full"
            type="date"
            name="dueDate"
            value={editFormData.dueDate}
            onChange={handleChange}
          />
          <button className="p-2  rounded-md text-2xl" type="submit">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
          <button
            className=""
            type="button"
            onClick={() => cancelEditing(todo)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div>
            <button
              className="w-7 h-7"
              onClick={(e) => changeCompletionStatus(e, todo.id)}
            >
              {todo.completed ? (
                <Image
                  priority={true}
                  src="/checkbox.svg"
                  alt="checkbox-img"
                  width={40}
                  height={40}
                />
              ) : (
                <div className="w-7 h-7 border border-rose-400 rounded-md"></div>
              )}
            </button>
          </div>
          <div
            className={`flex flex-col gap-2 w-full ${
              todo.completed ? "line-through" : ""
            }`}
          >
            <h3 className="text-2xl">{todo.title}</h3>
            <section className="font-sans">{todo.description}</section>
          </div>
          <div className="flex flex-row gap-4 justify-center items-center">
            <p
              className={`font-sans text-sm w-30 ${
                isDueTodayOrEarlier(todo.dueDate) ? "text-red-400" : ""
              }`}
            >
              Due: {todo.dueDate}
            </p>
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
