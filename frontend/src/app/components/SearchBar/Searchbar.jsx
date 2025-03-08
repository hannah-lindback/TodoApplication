import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ todos, setSearchResults }) => {
  const handleSearchSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) return setSearchResults(todos);

    const resultsArray = todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchTerm) ||
        todo.description.toLowerCase().includes(searchTerm)
    );

    setSearchResults(resultsArray);
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex items-center justify-center"
    >
      <input
        type="text"
        name="search"
        placeholder="Search todos..."
        onChange={handleSearchChange}
        className="p-2 border border-gray-300 rounded-md"
      />
      <button type="submit" className="p-2 bg-gray-300 rounded-md">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};

export default SearchBar;
