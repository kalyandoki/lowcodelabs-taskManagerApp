import React from "react";

import { useTask } from "../context/TaskContext";

function SearchBar() {
  const { search, setSearch } = useTask();

  return (
    <input
      type="text"
      placeholder="🔍 Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full sm:w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}

export default SearchBar;
