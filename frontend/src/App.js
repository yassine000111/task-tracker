import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./services/taskService";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (taskTitle.trim() === "") return;
    await createTask({ title: taskTitle });
    setTaskTitle("");
    fetchTasks();
  };

  const handleToggleTask = async (id, completed) => {
    await updateTask(id, { completed: !completed });
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.title}
            </span>
            <button onClick={() => handleToggleTask(task._id, task.completed)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
