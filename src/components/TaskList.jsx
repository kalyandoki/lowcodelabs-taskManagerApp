import React from "react";

import TaskItem from "./TaskItem";
import { useTask } from "../context/TaskContext";

function TaskList() {
  const { filteredTasks } = useTask();

  if (filteredTasks.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        No tasks found.
      </p>
    );
  }

  return (
    <>
      <ul className="w-full grid gap-4 sm:grid-cols-1 md:grid-cols-1 transition-all duration-500 ease-in-out">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
}

export default TaskList;
