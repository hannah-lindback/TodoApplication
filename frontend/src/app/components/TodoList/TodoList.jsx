import Todo from "../Todo/Todo";

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
      <div className="w-200">
        <h2 className="font-sans text-2xl">
          Couldn't find any todos, add something!
        </h2>
      </div>
    );

  return (
    <div>
      <ul className="flex flex-col gap-4 sm:inline  ">{listContent}</ul>
    </div>
  );
};

export default TodoList;
