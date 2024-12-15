import api from './api';

export const getTasks = (taskListId) => api.get(`/task-lists/${taskListId}/tasks`);
export const getTaskById = (taskListId, taskId) => api.get(`/task-lists/${taskListId}/tasks/${taskId}`);
export const createTask = (taskListId, data) => api.post(`/task-lists/${taskListId}/tasks`, data);
export const updateTask = (taskListId, taskId, data) => api.put(`/task-lists/${taskListId}/tasks/${taskId}`, data);
export const deleteTask = (taskListId, taskId) => api.delete(`/task-lists/${taskListId}/tasks/${taskId}`);
