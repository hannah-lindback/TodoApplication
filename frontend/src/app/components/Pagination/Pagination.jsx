const Pagination = ({
  todosPerPage,
  length,
  handlePagination,
  currentPage,
}) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / todosPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="pagination">
      {paginationNumbers.map((pageNumber) => (
        <button
          className={`w-8 h-8 border-rose-400 border-2 rounded-full m-1 ${
            currentPage === pageNumber ? "bg-rose-400 text-white" : ""
          }`}
          key={pageNumber}
          onClick={() => handlePagination(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
