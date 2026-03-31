// lib/api-client.ts
import axios from "axios";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // http://localhost:5000/api/v1
    withCredentials: true, // 👈 sends cookies — required for req.user to work
});
