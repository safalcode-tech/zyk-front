import axios from 'axios';
import { useLoader } from '../contexts/LoaderContext'; // Ensure proper path
import React from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

const setupInterceptors = (setIsLoading) => {
  // Request Interceptor
  api.interceptors.request.use(
    (config) => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  api.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      return response;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );
};

export const ApiProvider = ({ children }) => {
  const { setIsLoading } = useLoader();

  React.useEffect(() => {
    setupInterceptors(setIsLoading);
  }, [setIsLoading]);

  return children;
};

export default api;
