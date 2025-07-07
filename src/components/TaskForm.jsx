import React from "react";

import { useEffect, useState } from "react";
import { useTask } from "../context/TaskContext";

function TaskForm() {
  const { addTask, editTask, setEditTask } = useTask();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description || "");
      setPriority(editTask.priority || "medium");
      setDueDate(editTask.dueDate || "");
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");

    const task = {
      id: editTask ? editTask.id : Date.now(),
      title,
      description,
      priority,
      dueDate,
      status: editTask ? editTask.status : "pending",
      createdAt: editTask ? editTask.createdAt : new Date().toISOString(),
    };

    addTask(task);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setEditTask(null);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 space-y-4 transition-all duration-300 ease-in-out"
      >
        <input
          type="text"
          placeholder="📝 Task Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />

        <textarea
          placeholder="💬 Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟠 Medium</option>
            <option value="high">🔴 High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all duration-300"
          >
            {editTask ? "🔄 Update Task" : "➕ Add Task"}
          </button>

          {editTask && (
            <button
              type="button"
              onClick={() => setEditTask(null)}
              className="text-sm text-red-500 hover:text-red-700 hover:underline transition duration-300"
            >
              ❌ Cancel Edit
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default TaskForm;
