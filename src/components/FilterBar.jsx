import React from "react";

import { useTask } from "../context/TaskContext";

function FilterBar() {
  const { filter, setFilter } = useTask();

  const filters = ["all", "pending", "completed"];

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {filters.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full font-medium capitalize transition-all duration-300 ease-in-out transform
        ${
          filter === status
            ? "bg-blue-600 text-white shadow-md scale-105"
            : "bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-800 shadow-sm dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-blue-700 dark:hover:text-white"
        }
      `}
          >
            {status}
          </button>
        ))}
      </div>
    </>
  );
}

export default FilterBar;
