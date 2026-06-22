import axios from "axios";

// Axios instance create karna
const api = axios.create({
baseURL: "http://localhost:5000/api",
  timeout: 10000, // 10 seconds timeout agar server slow ho
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Token automatically attach karna
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Unauthorized access ko handle karna
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Agar token expired ho ya invalid ho (401)
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Redirect to login only if not already on login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;