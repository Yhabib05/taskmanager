import api from './api';

export const getTaskLists = () => api.get('/task-lists');
export const getTaskListById = (id) => api.get(`/task-lists/${id}`);
export const getTaskListMembers = (id) => api.get(`task-lists/${id}/members`);
export const addUserToTaskList = (id,data) => api.post(`task-lists/${id}/members`,data);
export const deleteUserFromTaskList = (id,member_id) => api.delete(`task-lists/${id}/members/${member_id}`);
export const createTaskList = (data) => api.post('/task-lists', data);
export const updateTaskList = (id, data) => api.put(`/task-lists/${id}`, data);
export const deleteTaskList = (id) => api.delete(`/task-lists/${id}`);

/* New */
export const getTaskListsByAuthor = (userEmail) => api.get(`/task-lists/${userEmail}/`);
