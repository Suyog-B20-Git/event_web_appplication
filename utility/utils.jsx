import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // ✅ Use `import.meta.env` in Vite
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsIm5hbWUiOiJqb2huZG9lIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc0MDA1MTkzNiwiZXhwIjoxNzQwMDczNTM2fQ.P2w08MOH9YgJG49_EB8jqKHc1Me5gw3_yXV6pFeEL94"; // 🔥 Replace this with your actual token
console.log("t:", API_URL);

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",

    Authorization: `${AUTH_TOKEN}`, // ✅ Hardcoded token
  },
});
console.log("t:", axiosInstance);
