import axios from "axios";

export const API_URL = "http://localhost:5000";

const createAPI = (path) => {
  const api = axios.create({ baseURL: `${API_URL}/api/${path}` });
  api.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
  return api;
};

export const AdminAPI = createAPI('admin');
export const MarkAPI = createAPI('marks');
export const NoticeAPI = createAPI('notices');
export const MaterialAPI = createAPI('materials');
export const UserAPI = createAPI('users');
