import Todo from "../Todo/Todo";

/**
 * JSX element that displays a list of todos
 * @param {*} param0
 * @returns a list of todo objects
 */
const TodoList = ({
  searchResults,
  startEditing,
  deleteTodo,
  handleEditSubmit,
  editingTodoId,
  editFormData,
  setEditFormData,
  cancelEditing,
  changeCompletionStatus,
}) => {
  const results = searchResults.map((todo) => (
    <Todo
      key={todo.id}
      todo={todo}
      startEditing={startEditing}
      deleteTodo={deleteTodo}
      handleEditSubmit={handleEditSubmit}
      editingTodoId={editingTodoId}
      editFormData={editFormData}
      setEditFormData={setEditFormData}
      cancelEditing={cancelEditing}
      changeCompletionStatus={changeCompletionStatus}
    />
  ));

  const listContent =
    results.length > 0 ? (
      results
    ) : (
      <div className="flex justify-center items-center md:w-200 md:flex lg:justify-start lg:w-200 lg:justify-start xl:w-200 xl:justify-start 2xl:w-200 2xl:justify-start">
        <h2 className="font-sans text-2xl">
          Couldn't find any todos...Try again!
        </h2>
      </div>
    );

  return (
    <div>
      <ul className=" ">{listContent}</ul>
    </div>
  );
};

export default TodoList;
