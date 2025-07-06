import React from "react";

import { useTask } from "../context/TaskContext";

function FilterBar() {
  const { filter, setFilter } = useTask();

  const filters = ["all", "pending", "completed"];

  return (
    <div className="flex gap-2">
      {filters.map((status) => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          className={`px-3 py-1 rounded capitalize transition ${
            filter === status
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
