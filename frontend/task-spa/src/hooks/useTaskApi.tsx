import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Task, TaskCreateDTO, TaskUpdateDTO } from "../types/Task";

const API_BASE_URL = "http://localhost:8080";
const AUTH_CONFIG = { auth: { username: "admin", password: "admin" } };

const useTaskApi = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Centralized request handler
  async function request<T>(method: "get" | "post" | "put" | "delete", url: string, data?: any): Promise<T | null> {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await axios({ method, url, data, ...AUTH_CONFIG });
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        typeof axiosError.response?.data === "string"
          ? axiosError.response?.data
          : "An error occurred while processing the request."
      );
      return null;
    } finally {
      setLoading(false);
    }
  }

  // Fetch all tasks
  async function fetchTasks() {
    const data = await request<Task[]>("get", `${API_BASE_URL}/tasks`);
    if (data) setTasks(data); // Keep reference fresh
  }

  // Fetch a single task
  async function fetchTaskById(id: number): Promise<Task | null> {
    return await request<Task>("get", `${API_BASE_URL}/tasks/${id}`);
  }

  // Create a task and refresh the task list
  async function createTask(newTask: TaskCreateDTO): Promise<boolean> {
    const data = await request<Task>("post", `${API_BASE_URL}/tasks`, newTask);
    if (data) {
      setSuccess("Task created successfully!");
      fetchTasks(); // Refresh task list
      return true;
    }
    return false;
  }

  // Update a task
  async function updateTask(id: number, updatedTask: TaskUpdateDTO): Promise<boolean> {
    const data = await request<Task>("put", `${API_BASE_URL}/tasks/${id}`, updatedTask);
    if (data) {
      setTasks((prev) => prev.map((task) => (task.id === id ? data : task)));
      setSuccess("Task updated successfully!");
      return true;
    }
    return false;
  }

  // Delete a task
  async function deleteTask(id: number): Promise<boolean> {
    const success = await request<void>("delete", `${API_BASE_URL}/tasks/${id}`);
    if (success !== null) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setSuccess("Task deleted successfully.");
      return true;
    }
    return false;
  }

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, success, fetchTasks, fetchTaskById, createTask, updateTask, deleteTask };
};

export default useTaskApi;
