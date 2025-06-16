import axios from "axios";
const token = localStorage.getItem("authToken");

const API_URL = import.meta.env.VITE_API_URL; // ✅ Use `import.meta.env` in Vite
const AUTH_TOKEN = token;

 const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    // "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",

    Authorization: `${AUTH_TOKEN}`, // ✅ Hardcoded token
  },
});

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

export {axiosInstance};
{/*---------------------------------------------------------------*/}

