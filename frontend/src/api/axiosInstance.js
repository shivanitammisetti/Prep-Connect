import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
});

axiosInstance.interceptors.request.use((config) => {
  const stored = localStorage.getItem("prepconnect_user");
  if (stored) {
    const user = JSON.parse(stored);
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default axiosInstance;