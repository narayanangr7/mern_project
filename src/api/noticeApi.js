import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/notice"
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const getNotices = () => API.get("/all");
export const postNotice = (data) => API.post("/create", data);
export const deleteNotice = (id) => API.delete(`/${id}`);
