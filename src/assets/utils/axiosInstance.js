// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://h2p-associates-s8tn.onrender.com", // ✅ Replace with actual API base URL
  // baseURL: "http://localhost:8000", // ✅ Replace with actual API base URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // assumes token is saved on login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
