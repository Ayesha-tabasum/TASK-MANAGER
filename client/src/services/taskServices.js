import api from "./api";

const token = () => localStorage.getItem("token");

// create task
export const createTask = async (data) => {
  const res = await api.post(`/task`, data, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.data;
};

// get tasks
export const getTask = async (page, limit) => {
  const res = await api.get(`/task?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.data;
};

// search task
export const searchTask = async (keyword) => {
  const res = await api.get(`/task/search?keyword=${keyword}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.data;
};

// filter task
export const filterTask = async (priority) => {
  const res = await api.get(`/task/filter?priority=${priority}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.data;
};

// edit task
export const editTask = async (id, data) => {
  const res = await api.put(`/task/${id}`, data, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.data;
};

// delete task
export const deleteTask = async (id) => {
  const res = await api.delete(`/task/${id}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.data;
};