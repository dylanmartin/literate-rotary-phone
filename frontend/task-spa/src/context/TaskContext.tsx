import React, { createContext, useContext } from "react";
import useTaskApi from "../hooks/useTaskApi";

// Create a context
const TaskContext = createContext<ReturnType<typeof useTaskApi> | null>(null);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const taskApi = useTaskApi();
  return <TaskContext.Provider value={taskApi}>{children}</TaskContext.Provider>;
};

// Custom hook to consume the context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};
