import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/admin"
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const approveUser = (id) => API.put(`/approve/${id}`);
export const deleteUser = (id) => API.delete(`/user/${id}`);
export const createUser = (data) => API.post("/create-user", data);
