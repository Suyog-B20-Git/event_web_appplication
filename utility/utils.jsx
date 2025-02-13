import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // ✅ Use `import.meta.env` in Vite
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsIm5hbWUiOiJqb2huZG9lIiwiaWF0IjoxNzM5NDQ3NjI3LCJleHAiOjE3Mzk0NTEyMjd9.A7m061sNkeXoHqrUfoyt9Zhd5ZxhCfR672iLBewtRbM"; // 🔥 Replace this with your actual token
console.log("t:", API_URL);

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",

    Authorization: `${AUTH_TOKEN}`, // ✅ Hardcoded token
  },
});
console.log("t:", axiosInstance);
