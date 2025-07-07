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
    <>
      <div className={dark ? "dark" : ""}>
        <div
          className={`min-h-screen transition-colors duration-500 ease-in-out ${
            dark
              ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
              : "bg-gradient-to-br from-[#fdfbfb] via-[#ebedee] to-[#dfe9f3] text-gray-900"
          } px-4 py-6`}
        >
          <div className="max-w-4xl mx-auto rounded-3xl p-6 md:p-10 shadow-2xl bg-white/80 dark:bg-[#1f2937]/10 backdrop-blur-lg border border-gray-200 dark:border-gray-700 transition-all">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                📋 Personal Task Manager
              </h1>
              <button
                onClick={() => setDark(!dark)}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-300"
              >
                {dark ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>

            <TaskForm onAdd={addTask} editingTask={editTask} />
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-6">
              <FilterBar current={filter} setFilter={setFilter} />
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <div className="text-sm text-center sm:text-left text-gray-600 dark:text-gray-400 mb-4">
              📊 <b>{pendingCount}</b> pending | <b>{completedCount}</b>{" "}
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
    </>
  );
}

export default App;
