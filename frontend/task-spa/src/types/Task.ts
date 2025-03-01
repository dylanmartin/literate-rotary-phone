export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
  }
  
  export interface TaskCreateDTO {
    title: string;
    description: string;
    status: TaskStatus;
  }
  
  export interface TaskUpdateDTO {
    title?: string;
    description?: string;
    status?: TaskStatus;
  }
  
  export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";
  