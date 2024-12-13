import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Set up interceptors globally
const setupInterceptors = () => {
  // Request Interceptor
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Run setup on initialization (ensure interceptors are added only once)
setupInterceptors();

export default api;
