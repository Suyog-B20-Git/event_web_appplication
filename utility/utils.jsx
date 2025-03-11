import axios from "axios";
const token = localStorage.getItem("authToken");

const API_URL = import.meta.env.VITE_API_URL; // ✅ Use `import.meta.env` in Vite
const AUTH_TOKEN = token;
console.log("t:", API_URL);


export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",

    // Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsIm5hbWUiOiJqb2huZG9lIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc0MDk4Njg1MywiZXhwIjoxNzQxMDA4NDUzfQ.txbWLrspjEjhrxXGw-cRWQqtJJ9CGjRqvmPZxAcIdk0`, // ✅ Hardcoded token
    Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsIm5hbWUiOiJqb2huZG9lIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc0MDk4NzAyMSwiZXhwIjoxNzQxMDA4NjIxfQ.2ANlkHe8d887rMp_mSo9gXMsm1O160hbm1D2KuyPGI0`, // ✅ Hardcoded token
  },
});
console.log("t:", axiosInstance);

export const axiosInstanceForFilesWithData = axios.create({
  baseURL: API_URL,
  headers: {
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",

    Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsIm5hbWUiOiJqb2huZG9lIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc0MDk4NzAyMSwiZXhwIjoxNzQxMDA4NjIxfQ.2ANlkHe8d887rMp_mSo9gXMsm1O160hbm1D2KuyPGI0`, // ✅ Hardcoded token
  },
});
console.log("t:", axiosInstance);

