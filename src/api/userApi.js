import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/users"
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const signupUser = (data) => API.post("/signup", data);
export const loginUser = (data) => API.post("/login", data);
export const getUsers = () => API.get("/");
export const getStats = () => API.get("/stats");
