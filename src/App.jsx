import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import { useTask } from "./context/TaskContext";

function App() {
  const {
    addTask,
    deleteTask,
    toggleStatus,
    filter,
    setFilter,
    search,
    setSearch,
    editTask,
    setEditTask,
    dark,
    setDark,
    completedCount,
    pendingCount,
    filteredTasks,
  } = useTask();

  return (
    <div className={dark ? "dark" : ""}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          dark ? " bg-black text-white" : "bg-gray-600 text-gray-100"
        } p-4`}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">
              📋 Personal Task Management App
            </h1>
            <button
              onClick={() => setDark(!dark)}
              className="bg-gray-800 dark:bg-white text-white dark:text-black px-3 py-1 rounded transition"
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
          <TaskForm onAdd={addTask} editingTask={editTask} />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 my-4">
            <FilterBar current={filter} setFilter={setFilter} />
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="text-sm mb-2">
            📊 Stats: <b>{pendingCount}</b> pending, <b>{completedCount}</b>{" "}
            completed
          </div>
          <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onToggle={toggleStatus}
            onEdit={setEditTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
