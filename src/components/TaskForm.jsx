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
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow p-4 rounded space-y-3 transition-all"
    >
      <input
        type="text"
        placeholder="Task Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700"
      ></textarea>
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700"
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟠 Medium</option>
          <option value="high">🔴 High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700"
        />
      </div>
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
        >
          {editTask ? "Update Task" : "Add Task"}
        </button>
        {editTask && (
          <button
            type="button"
            onClick={() => setEditTask(null)}
            className="text-sm text-red-500 hover:underline"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
