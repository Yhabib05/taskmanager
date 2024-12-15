import api from './api';

export const getTaskLists = () => api.get('/task-lists');
export const getTaskListById = (id) => api.get(`/task-lists/${id}`);
export const createTaskList = (data) => api.post('/task-lists', data);
export const updateTaskList = (id, data) => api.put(`/task-lists/${id}`, data);
export const deleteTaskList = (id) => api.delete(`/task-lists/${id}`);
