import Todo from "../Todo/Todo";

const TodoList = ({ searchResults, startEditing, deleteTodo }) => {
  const results = searchResults.map((todo) => (
    <Todo
      key={todo.id}
      todo={todo}
      startEditing={startEditing}
      deleteTodo={deleteTodo}
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
