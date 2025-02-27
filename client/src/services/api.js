import axios from "axios";

const api = axios.create({
  baseURL: "https://warpbay-ems.onrender.com/api", // Replace with your backend URL
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;