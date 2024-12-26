import api from "./api";

export const login = (data)=>api.post('/login',data)

export const getAllUsers = ()=>api.get(`/utilisateurs`);
export const getUserById = (id)=>api.get(`/utilisateurs/${id}`)
export const addUser = (data)=>api.post(`/utilisateurs/`,data)
export const updateUser = (id, data) => api.put(`/utilisateurs/${id}`, data);
export const deleteUser = (id) => api.delete(`/utilisateurs/${id}`);
export const getTaskListsByAuthor = (userId) => api.get(`/utilisateurs/${userId}/task-lists`);