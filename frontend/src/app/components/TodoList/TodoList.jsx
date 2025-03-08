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
    />
  ));

  const listContent = results?.length ? (
    results
  ) : (
    <li>
      <h2>No results found</h2>
    </li>
  );

  return <ul>{listContent}</ul>;
};

export default TodoList;
