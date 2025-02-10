import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // ✅ Use `import.meta.env` in Vite
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsIm5hbWUiOiJqb2huZG9lIiwiaWF0IjoxNzM5MTY2MzUyLCJleHAiOjE3MzkxNjk5NTJ9.Haw_XMvWBm5MXvW1nCthdHJbfOOwNY_PPD7HbZnB_dc"; // 🔥 Replace this with your actual token
console.log("t:",API_URL)

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `${AUTH_TOKEN}`, // ✅ Hardcoded token
    },
});
console.log("t:",axiosInstance)