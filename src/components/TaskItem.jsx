import React from "react";
import { useTask } from "../context/TaskContext";

function TaskItem({ task }) {
  const { deleteTask, toggleStatus, setEditTask } = useTask();

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status === "pending";

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-100";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-100";
      case "low":
      default:
        return "bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-100";
    }
  };

  return (
    <>
      <li className="w-full bg-white dark:bg-gradient-to-tr dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 transition-transform duration-300 hover:scale-[1.015] hover:shadow-2xl">
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <h3
              className={`text-xl font-semibold leading-tight transition-all ${
                task.status === "completed"
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-800 dark:text-white"
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wider shadow-md ${getPriorityStyle(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">
              {task.description}
            </p>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400">
            🕒 Created: {new Date(task.createdAt).toLocaleString()}
          </p>

          {task.dueDate && (
            <p
              className={`text-xs ${
                isOverdue ? "text-red-500 font-semibold" : "text-gray-500"
              }`}
            >
              📅 Due: {task.dueDate} {isOverdue && "⚠️ Overdue"}
            </p>
          )}
        </div>

        <div className="flex flex-row sm:flex-col gap-2 min-w-[120px]">
          <button
            onClick={() => toggleStatus(task.id)}
            className={`text-xs font-medium px-3 py-1 rounded-md shadow-md transition-all duration-200 ${
              task.status === "completed"
                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {task.status === "completed" ? "Pending" : "Complete"}
          </button>

          <button
            onClick={() => setEditTask(task)}
            className="text-xs font-medium px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white shadow-md transition-all"
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            className="text-xs font-medium px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white shadow-md transition-all"
          >
            🗑 Delete
          </button>
        </div>
      </li>
    </>
  );
}

export default TaskItem;
