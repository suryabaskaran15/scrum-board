import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./api"; // Import our Axios instance
import { Task, TaskStatus } from "../types/types";

const TASKS_URL = "/tasks"; // Use relative URL since baseURL is already set

// Fetch tasks
export const useTasks = () => {
    return useQuery<Task[]>({
        queryKey: ["tasks"],
        queryFn: async () => (await apiClient.get(TASKS_URL)).data,
    });
};

// Add new task
export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (task: Partial<Task>) => (await apiClient.post(TASKS_URL, task)).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
};

// Update task (for drag & drop)
export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedTasks: Task[]) =>
            (await apiClient.post('/tasks',  [...updatedTasks] )).data,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
};

// Edit task (for updating title, description, status, etc.)
export const useEditTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, title, description,assignee, status }: Task) =>
            (await apiClient.put(`${TASKS_URL}/${id}`, { title, description,assignee, status })).data,
        // onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
};
