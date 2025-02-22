export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
  id: number;
  title: string;
  description?: string;
  assignee: User | null;
  status: TaskStatus;
  position: number;
  isDraft?:boolean;
}

export interface User {
  id: string;
  name: string;
}