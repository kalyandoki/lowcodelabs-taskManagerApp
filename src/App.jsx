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
    deleteMessage,
  } = useTask();

  return (
    <>
      {deleteMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-6 py-4 rounded-xl shadow-xl z-50 animate-slideDown border border-white/20 backdrop-blur-md transition-all duration-300 ease-out">
          <div className="flex items-center gap-3">
            <span className="text-sm sm:text-base font-medium tracking-wide">
              {deleteMessage}
            </span>
          </div>
        </div>
      )}

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
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                📋 Personal Task Manager Application
              </h2>
              <button
                onClick={() => setDark(!dark)}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-300"
              >
                {dark ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>

            <TaskForm onAdd={addTask} />

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

            {editTask && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
                <div className="relative w-full max-w-lg rounded-2xl p-6 sm:p-8 bg-white/80 dark:bg-gray-900/90 shadow-2xl border border-gray-300 dark:border-gray-700 transition-all animate-fadeIn">
                  <button
                    onClick={() => setEditTask(null)}
                    className="absolute top-3 right-4 text-2xl text-gray-500 dark:text-gray-300 hover:text-red-500 transition duration-300"
                    aria-label="Close Edit Modal"
                  >
                    ✖
                  </button>

                  <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    ✏️ Edit Task
                  </h2>

                  <TaskForm onAdd={addTask} editingTask={editTask} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
