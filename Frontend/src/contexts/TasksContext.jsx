import { useState, useEffect } from "react";
import { getData } from "../services/get";
const API_URL = import.meta.env.VITE_API_URL;

import { TasksContext } from "./contexts";

export const TasksContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : null;
  }); // and here tasks for local storage or null
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasksAndCategories = async () => {
      try {
        const tasksRes = await getData("tasks");
        const categoriesRes = await getData("categories");

        const fetchedTasks = tasksRes.user_tasks;
        const fetchedCategories = categoriesRes.categories;

        setTasks(fetchedTasks);
        setCategories(fetchedCategories);

        localStorage.setItem("tasks", JSON.stringify(fetchedTasks));
        localStorage.setItem("categories", JSON.stringify(fetchedCategories));
      } catch (err) {
        console.error("Failed to fetch tasks or categories:", err);
        setTasks([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasksAndCategories();
  }, []);

  return (
    <TasksContext
      value={{ tasks, setTasks, categories, setCategories, loading }}
    >
      {children}
    </TasksContext>
  );
};
