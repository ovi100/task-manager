import React, { useState } from "react";

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, isDarkMode }) => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  let filteredTasks = [];

  const toggleComplete = (task) => {
    onUpdateTask({ ...task, completed: !task.completed });
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditedTask(task);
  };

  const saveEdit = () => {
    onUpdateTask(editedTask);
    setEditingTaskId(null);
  };

  if (selectedOption === "all") {
    filteredTasks = tasks;
  }

  if (selectedOption === "completed") {
    filteredTasks = tasks.filter((item) => item.completed);
  }

  if (selectedOption === "pending") {
    filteredTasks = tasks.filter((item) => !item.completed);
  }

  return (
    <>
      {tasks.length > 0 && (
        <>
          <select
            id="filters"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
        dark:focus:border-blue-500 mb-3"
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option selected>Choose a Filter</option>
            <option value="all">show all</option>
            <option value="completed">completed</option>
            <option value="pending">pending</option>
          </select>
        </>
      )}
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`p-2 border-b border-gray-300 flex justify-between items-center ${
              task.completed ? "bg-green-100" : ""
            }`}
          >
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                  className="flex-1 p-1 border border-gray-300 rounded"
                />
                <button onClick={saveEdit} className="text-blue-500 ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <div
                  className={`flex-1 ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                  onClick={() => toggleComplete(task)}
                >
                  <strong
                    className={`${isDarkMode ? "text-gray-300" : "text-black"}`}
                  >
                    {task.title}
                  </strong>
                  <p className="text-sm">{task.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEditing(task)}
                    className="text-yellow-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
