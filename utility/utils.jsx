import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // ✅ Use `import.meta.env` in Vite
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsIm5hbWUiOiJqb2huZG9lIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTczOTk0MTM3MywiZXhwIjoxNzM5OTYyOTczfQ.A1a_gRJ31fqbdjD8zkP_zN0e3p-b9weXavg6511gI2k"; // 🔥 Replace this with your actual token
console.log("t:", API_URL);

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",

    Authorization: `${AUTH_TOKEN}`, // ✅ Hardcoded token
  },
});
console.log("t:", axiosInstance);
