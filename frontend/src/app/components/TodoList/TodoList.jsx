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
  changeCompletionStatus, // Add this line
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
      changeCompletionStatus={changeCompletionStatus} // Pass the function here
    />
  ));

  const listContent =
    results.length > 0 ? (
      results
    ) : (
      <li>
        <h2>Nothing to do it seems!</h2>
      </li>
    );

  return (
    <div>
      <ul className="flex flex-col gap-2">{listContent}</ul>
    </div>
  );
};

export default TodoList;
