import { useEffect, useState } from "react";
import { useTask } from "../context/TaskContext";

function TaskForm({ onAdd, editingTask }) {
  const { setEditTask } = useTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority || "low");
      setDueDate(editingTask.dueDate || "");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");

    const task = {
      id: editingTask?.id || Date.now(),
      title,
      description,
      priority,
      dueDate,
      status: editingTask?.status || "pending",
      createdAt: editingTask?.createdAt || new Date().toISOString(),
    };

    onAdd(task);
    setTitle("");
    setDescription("");
    setPriority("low");
    setDueDate("");
    setEditTask(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 shadow-xl p-6 rounded-2xl space-y-5 transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      <input
        type="text"
        placeholder="📝 Enter task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <textarea
        placeholder="💬 Enter task description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      ></textarea>

      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟠 Medium</option>
          <option value="high">🔴 High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
        />
      </div>

      <div className="flex justify-start">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          {editingTask ? "🔄 Update Task" : "➕ Add Task"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
