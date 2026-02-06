import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {

    const isAdminRoute = window.location.pathname.startsWith("/admin");

    const token = isAdminRoute
      ? localStorage.getItem("adminToken")
      : localStorage.getItem("userToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("userToken");

      window.location.href = "/adminlogin";
      return;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
