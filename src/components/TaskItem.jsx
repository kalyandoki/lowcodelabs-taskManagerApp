import React from "react";
import { useTask } from "../context/TaskContext";

function TaskItem({ task }) {
  const { deleteTask, toggleStatus, setEditTask } = useTask();

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status === "pending";

  const getPriorityStyle = (level) => {
    switch (level) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <li
      className={`bg-white dark:bg-gray-800 shadow-md rounded p-4 flex justify-between items-start transition-all hover:scale-[1.01]`}
    >
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-center">
          <h3
            className={`text-lg font-semibold ${
              task.status === "completed" ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded-full ${getPriorityStyle(
              task.priority
            )} ml-2`}
          >
            {task.priority}
          </span>
        </div>
        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {task.description}
          </p>
        )}
        <p className="text-xs text-gray-400">
          Created: {new Date(task.createdAt).toLocaleString()}
        </p>
        {task.dueDate && (
          <p
            className={`text-xs ${
              isOverdue ? "text-red-600 font-semibold" : "text-gray-400"
            }`}
          >
            Due: {task.dueDate} {isOverdue && "(Overdue)"}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 ml-4">
        <button
          onClick={() => toggleStatus(task.id)}
          className={`text-xs px-3 py-1 rounded ${
            task.status === "completed"
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          } text-white`}
        >
          {task.status === "completed" ? "Pending" : "Complete"}
        </button>
        <button
          onClick={() => setEditTask(task)}
          className="text-xs px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-xs px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
