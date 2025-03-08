import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
const Todo = ({ todo, startEditing, deleteTodo }) => {
  return (
    <li className="flex flex-row p-4 border border-gray-200 rounded-md w-300 justify-between">
      <div className="flex flex-row gap-2">
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
    </li>
  );
};

export default Todo;
