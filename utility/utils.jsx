import axios from "axios";
const token = localStorage.getItem("authToken");

const API_URL = import.meta.env.VITE_API_URL; // ✅ Use `import.meta.env` in Vite
const AUTH_TOKEN = token;
console.log("t:", API_URL);

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",

    Authorization: `${AUTH_TOKEN}`, // ✅ Hardcoded token
  },
});
console.log("t:", axiosInstance);

{/*---------------------------------------------------------------*/}

// import axios from "axios";
// import { Auth } from "../src/redux/Urls";

// const API_URL = import.meta.env.VITE_API_URL; // ✅ Use `import.meta.env` in Vite

// export const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Attach Interceptor for Dynamic Token Handling
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("authToken"); // Get latest token
//   if (token) {
//     config.headers.Authorization = `${token}`;
//   }
//   return config;
// });

// // ✅ Attach Interceptor for Refreshing Token on 401 Errors
// axiosInstance.interceptors.response.use(
//   (response) => response, // Return response if successful
//   async (error) => {
//     console.log("refresh")
//     const originalRequest = error.config;
  
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Prevent infinite loop

//       try {
//         const refreshResponse = await axios.post(
//           `${Auth.refreshToken}`,
//           {},
//           { withCredentials: true } // Send cookies
//         );

//         if (refreshResponse.status === 200) {
//           const newToken = refreshResponse.data.token;
//           localStorage.setItem("authToken", newToken); // Store new token
//           axiosInstance.defaults.headers.Authorization = `${newToken}`;
//           originalRequest.headers.Authorization = `${newToken}`;
//           return axiosInstance(originalRequest); // Retry failed request
//         }
//       } catch (refreshError) {
//         console.error("Refresh token expired. Logging out...");
//         console.log(refreshError)
    
//         localStorage.removeItem("authToken");
//         window.location.href = "/login"; // Redirect to login
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// console.log("t:", API_URL);
// console.log("t:", axiosInstance);



// import axios from "axios";
// import { Auth } from "../src/redux/Urls";

// const API_URL = import.meta.env.VITE_API_URL;

// export const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//     // Remove any default CORS headers - let the browser handle this
//   },
//   withCredentials: true, // Keep this for sending cookies
//   // Add timeout to prevent hanging requests
//   timeout: 10000,
// });

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     // Ensure headers are properly merged
//     config.headers = {
//       ...config.headers,
//       "X-Requested-With": "XMLHttpRequest", // Helps identify AJAX requests
//     };
//     return config;
//   },
//   (error) => {
//     console.error("Request interceptor error:", error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // Log CORS-specific errors
//     if (error.message.includes('Network Error') || error.message.includes('CORS')) {
//       console.error('CORS or Network Error:', {
//         message: error.message,
//         config: {
//           url: error.config?.url,
//           method: error.config?.method,
//           headers: error.config?.headers,
//           withCredentials: error.config?.withCredentials
//         }
//       });
//     }

//     console.log("Response error:", {
//       status: error.response?.status,
//       message: error.message,
//       originalUrl: error.config?.url
//     });

//     const originalRequest = error.config;
    
//     if (
//       (error.response?.status === 401 || error.response?.status === 403) && 
//       !originalRequest._retry
//     ) {
//       console.log("Attempting token refresh...");
//       originalRequest._retry = true;

//       try {
//         const refreshResponse = await axios.post(
//           `${API_URL}${Auth.refreshToken}`,
//           {},
//           { 
//             withCredentials: true,
//             headers: {
//               "Content-Type": "application/json",
//               "Accept": "application/json",
//               "X-Requested-With": "XMLHttpRequest"
//             }
//           }
//         );

//         console.log("Refresh response:", refreshResponse.status);

//         if (refreshResponse.status >= 200 && refreshResponse.status < 300) {
//           const newToken = refreshResponse.data.token;
//           console.log("New token received");
          
//           localStorage.setItem("authToken", newToken);

//           // Update token in axios defaults and original request
//           axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;

//           console.log("Retrying original request to:", originalRequest.url);
//           return axiosInstance(originalRequest);
//         }
//       } catch (refreshError) {
//         console.error("Token refresh failed:", {
//           status: refreshError.response?.status,
//           message: refreshError.message,
//           cors: refreshError.message.includes('CORS')
//         });

//         // Clear auth state and redirect to login
//         localStorage.removeItem("authToken");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

