import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

/**
 * JSX component that displays a search bar and sets search results based on user input
 * @param {*} param0
 * @returns form element with search bar and search button
 */
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
    <form onSubmit={handleSearchSubmit}>
      <div className="flex justify-between items-center border rounded-md">
        <input
          type="text"
          name="search"
          placeholder="Search todos..."
          onChange={handleSearchChange}
          className="p-2 rounded-md flex-grow focus:outline-none"
        />
        <button type="submit" className="p-2 bg-rose-400 text-white">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
