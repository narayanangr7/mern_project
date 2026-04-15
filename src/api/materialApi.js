import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/material"
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const getMaterials = () => API.get("/all");
export const uploadMaterial = (formData) => API.post("/upload", formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});
