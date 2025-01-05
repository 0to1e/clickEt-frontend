// src/utils/axiosInstance.ts
import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
