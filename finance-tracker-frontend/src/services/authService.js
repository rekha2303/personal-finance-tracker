import axios from "axios";
import api from "./api"; // axios instance with baseURL, interceptors, etc.

// Define your backend base URL
const API_URL = "http://localhost:5000/api/auth";

// ✅ Register function
export async function register({ name, email, password }) {
    const { data } = await api.post(`${API_URL}/register`, {
        name,
        email,
        password,
    });
    return data; // { token, user }
}

// ✅ Login function
export async function login({ email, password }) {
    const { data } = await api.post(`${API_URL}/login`, {
        email,
        password,
    });
    return data; // { token, user }
}
