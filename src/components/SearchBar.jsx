import React from "react";

import { useTask } from "../context/TaskContext";

function SearchBar() {
  const { search, setSearch } = useTask();

  return (
    <>
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-72 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    shadow-sm hover:shadow-md focus:shadow-lg
    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
    transition-all duration-300 ease-in-out"
      />
    </>
  );
}

export default SearchBar;
