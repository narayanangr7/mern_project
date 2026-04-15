import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/result"
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const getResults = () => API.get("/all");
export const uploadResults = (formData) => API.post("/upload", formData);
export const deleteResult = (id) => API.delete(`/${id}`);
